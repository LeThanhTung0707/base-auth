"use client";

import { create } from "zustand";

interface SearchStore {
  location: string;
  setLocation: (location: string) => void;
  startDate: Date | undefined;
  endDate: Date | undefined;
  setDates: (startDate: Date | undefined, endDate: Date | undefined) => void;
  guests: number;
  setGuests: (count: number) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  location: "Địa điểm bất kỳ",
  setLocation: (location: string) => set({ location }),
  startDate: undefined,
  endDate: undefined,
  setDates: (startDate, endDate) => set({ startDate, endDate }),
  guests: 0,
  setGuests: (count: number) => set({ guests: count }),
}));
