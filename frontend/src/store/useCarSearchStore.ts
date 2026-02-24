"use client";

import { create } from "zustand";

interface CarSearchStore {
  location: string;
  setLocation: (location: string) => void;
  carType: string;
  setCarType: (carType: string) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
}

export const useCarSearchStore = create<CarSearchStore>((set) => ({
  location: "Hồ Chí Minh",
  setLocation: (location: string) => set({ location }),
  carType: "Tất cả các loại xe",
  setCarType: (carType: string) => set({ carType }),
  startDate: undefined,
  setStartDate: (date: Date | undefined) => set({ startDate: date }),
  endDate: undefined,
  setEndDate: (date: Date | undefined) => set({ endDate: date }),
}));
