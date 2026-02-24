"use client";

import { create } from "zustand";

interface JobSearchStore {
  keyword: string;
  setKeyword: (keyword: string) => void;
  location: string;
  setLocation: (location: string) => void;
  category: string;
  setCategory: (category: string) => void;
}

export const useJobSearchStore = create<JobSearchStore>((set) => ({
  keyword: "",
  setKeyword: (keyword: string) => set({ keyword }),
  location: "Toàn quốc",
  setLocation: (location: string) => set({ location }),
  category: "Tất cả ngành nghề",
  setCategory: (category: string) => set({ category }),
}));
