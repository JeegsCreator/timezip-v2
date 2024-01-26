import { useDate } from "@/context/useDate";
import { useSelectedCountries } from "@/context/useSelectedCountries";
import { useTemplate } from "@/context/useTemplate";
import { getFlagEmoji } from "@/lib/GetFlagEmoji";
import dayjs from "dayjs";
import tz from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { useEffect, useState } from "react";

dayjs.extend(tz);
dayjs.extend(utc);

type ParseCountry = {
  parsedTime: string;
  emojis: string[];
  hour: string;
};

const parseTimeByTemplate = (time: dayjs.Dayjs, template: string) => {
  return time.format(template);
};

export function useComputeResult() {
  const { selectedCountries } = useSelectedCountries();
  const { date } = useDate();
  const { format } = useTemplate();

  const [parsedCountries, setParsedCountries] = useState<ParseCountry[]>([]);

  useEffect(() => {
    const data: ParseCountry[] = [];

    selectedCountries.forEach((country) => {
      const capital = country.Timezone.find((t) => t.capital);
      if (!capital) return;

      const zonedDate = dayjs(date).tz(capital.zoneNames[0]);

      const isStackable = data.findIndex(
        (d) => d.parsedTime === parseTimeByTemplate(zonedDate, format),
      );

      if (isStackable !== -1) {
        data[isStackable].emojis.push(getFlagEmoji(country.countryCode));
      } else {
        data.push({
          parsedTime: parseTimeByTemplate(zonedDate, format),
          emojis: [getFlagEmoji(country.countryCode)],
          hour: zonedDate.format("HH"),
        });
      }

      setParsedCountries(data);
    });
  }, [selectedCountries, date, format]);

  return { parsedCountries };
}
