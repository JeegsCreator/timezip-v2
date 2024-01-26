import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DateState {
  date: string;
  includeDate: boolean;
  setIncludeDate: (value: boolean) => void;
  getDate: () => Date;
  setDate: (newDate: Date) => void;
}

export const useDate = create(
  persist<DateState>(
    (set, get) => ({
      date: new Date().toISOString(),
      includeDate: false,
      setIncludeDate: (value) => {
        set({ includeDate: value });
      },
      getDate: () => new Date(get().date),
      setDate: (newDate) => {
        set({ date: newDate.toISOString() });
      },
    }),
    {
      name: "timezip-v2-date",
    },
  ),
);
