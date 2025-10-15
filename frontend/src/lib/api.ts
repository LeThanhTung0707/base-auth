"use client";
import axios from "axios";
import { getCsrfToken } from "./csrf";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const csrf = getCsrfToken();
  if (
    csrf &&
    config.method &&
    !["get", "head"].includes(config.method.toLowerCase())
  ) {
    config.headers["x-csrf-token"] = csrf;
  }
  return config;
});

let isRefreshing = false;
let subscribers: ((ok: boolean) => void)[] = [];

function subscribe(cb: (ok: boolean) => void) {
  subscribers.push(cb);
}

function notifySubscribers(ok: boolean) {
  subscribers.forEach((cb) => cb(ok));
  subscribers = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (original?.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribe((ok) => {
            if (ok) resolve(api(original));
            else reject(error);
          });
        });
      }

      isRefreshing = true;
      try {
        await api.post("/auth/refresh");
        notifySubscribers(true);
        isRefreshing = false;
        return api(original);
      } catch (err) {
        console.warn("🔴 Refresh token invalid → redirect login");
        notifySubscribers(false);
        isRefreshing = false;
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
