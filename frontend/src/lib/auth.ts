import { User } from "@/store/authStore";
import { api } from "./api";

export const AuthAPI = {
  me: async () => (await api.get<User>("/auth/me")).data,
  login: async (email: string, password: string) =>
    (await api.post("/auth/login", { email, password })).data,
  register: async (email: string, password: string) =>
    (await api.post("/auth/register", { email, password })).data,
  refresh: async () => (await api.post("/auth/refresh")).data,
  logout: async () => (await api.post("/auth/logout")).data,
};
