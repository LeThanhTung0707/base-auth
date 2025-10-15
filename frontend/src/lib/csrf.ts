"use client";
import Cookies from "js-cookie";

export function getCsrfToken(): string | undefined {
  const cookieName = process.env.NEXT_PUBLIC_CSRF_COOKIE_NAME || "x-csrf-token";
  return Cookies.get(cookieName);
}
