"use client";

import { create } from "zustand";

interface SsoStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useSsoStore = create<SsoStore>((set) => ({
  searchQuery: "",
  setSearchQuery: (query: string) => set({ searchQuery: query }),
}));
