import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Country } from "@/types/timezone";
import timezones from "@/timezones.json";
import defaultCountries from "@/data/defaultCountries.json";

type Callback = (countries: Country[]) => Country[];

interface SelectedCountries {
  selectedCountries: Country[];
  selectCountry: (countryId: number) => void;
  unselectCountry: (countryId: number) => void;
  setSelectedCountries: (callback: Callback) => void;
}

export const useSelectedCountries = create(
  persist<SelectedCountries>(
    (set, get) => ({
      selectedCountries: defaultCountries,

      selectCountry: (countryId) => {
        const country = timezones.find((c) => c.id === countryId);

        if (country) {
          set((state) => ({
            selectedCountries: [...state.selectedCountries, country],
          }));
        }

        console.log(get().selectedCountries);
      },

      unselectCountry: (countryId) => {
        set((state) => ({
          selectedCountries: state.selectedCountries.filter(
            (c) => c.id !== countryId,
          ),
        }));
      },

      setSelectedCountries: (callback) => {
        set({ selectedCountries: callback(get().selectedCountries) });
      },
    }),
    {
      name: "timezip-v2-selected-countries",
    },
  ),
);
