import { create } from "zustand";

interface FoodSearchStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  location: string;
  setLocation: (location: string) => void;
}

export const useFoodSearchStore = create<FoodSearchStore>((set) => ({
  searchQuery: "",
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  location: "Hồ Chí Minh",
  setLocation: (location: string) => set({ location }),
}));
