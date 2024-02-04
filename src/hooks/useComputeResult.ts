import { useDate } from "@/context/useDate";
import { useSelectedCountries } from "@/context/useSelectedCountries";
import { useTemplate } from "@/context/useTemplate";
import { getFlagEmoji } from "@/lib/GetFlagEmoji";
import { computeResults } from "@/lib/computeResults";
import type { ParseCountry } from "@/types/parsedCountries";
import { useEffect, useState } from "react";

export function useComputeResult() {
  const selectedCountries = useSelectedCountries(
    (state) => state.selectedCountries,
  );
  const { date, includeDate } = useDate();
  const { format } = useTemplate();
  const [parsedCountries, setParsedCountries] = useState<ParseCountry[]>([]);

  useEffect(() => {
    const parsedCountries = computeResults({
      countries: selectedCountries,
      date: date,
      includeDate: includeDate,
      format,
    });

    setParsedCountries(parsedCountries);
  }, [selectedCountries, date, format, includeDate]);

  return { parsedCountries };
}
