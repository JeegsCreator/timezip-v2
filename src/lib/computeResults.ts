import type { ParseCountry } from "@/types/parsedCountries";
import type { Country } from "@/types/timezone";
import dayjs from "dayjs";
import tz from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { getFlagEmoji } from "./GetFlagEmoji";

dayjs.extend(tz);
dayjs.extend(utc);

const parseTimeByTemplate = (time: dayjs.Dayjs, template: string) => {
  return time.format(template);
};

type Params = {
  countries: Country[];
  date: string;
  includeDate: boolean;
  format?: string;
};

export function computeResults({
  countries,
  date,
  includeDate,
  format = "HH[H]",
}: Params) {
  const data: ParseCountry[] = [];

  countries.forEach((country) => {
    const capital = country.Timezone.find((t) => t.capital);
    if (!capital) return;

    let zonedDate = dayjs(date).tz(capital.zoneNames[0]);
    const getDate = new Date(date);

    if (!includeDate) {
      zonedDate = dayjs()
        .set("hours", getDate.getHours())
        .set("minutes", getDate.getMinutes())
        .tz(capital.zoneNames[0]);
    }

    const isStackable = data.findIndex(
      (d) => d.parsedTime === parseTimeByTemplate(zonedDate, format),
    );

    if (isStackable !== -1) {
      data[isStackable].emojis.push(getFlagEmoji(country.countryCode));
    } else {
      data.push({
        parsedTime: parseTimeByTemplate(zonedDate, format),
        emojis: [getFlagEmoji(country.countryCode)],
      });
    }
  });

  return data;
}
