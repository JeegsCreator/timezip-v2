import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Template {
  format: "HH[H]" | "hh:mm A";
  setFormat: (value: string) => void;
}

export const useTemplate = create(
  persist<Template>(
    (set) => ({
      format: "HH[H]" as const,
      setFormat: (value) => {
        if (value === "HH[H]" || value === "hh:mm A") {
          set({ format: value });
        }
      },
    }),
    {
      name: "timezip-v2-format",
    },
  ),
);
