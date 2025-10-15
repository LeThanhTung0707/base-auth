"use client";
import { create } from "zustand";

export interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  setUser: (u: User) => void;
  clearUser: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  setUser: (u) => set({ user: u }),
  clearUser: () => set({ user: null }),
  get isAuthenticated() {
    return !!get().user;
  },
}));
