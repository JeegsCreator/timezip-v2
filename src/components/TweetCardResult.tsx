import type { Country } from "@/types/timezone";
import ResultLine from "./ResultLine";
import { computeResults } from "@/lib/computeResults";

type Props = {
  tweetCountries: Country[];
  tweetDate: {
    date: string;
    includeDate: boolean;
  };
  tweetFormat: string;
};

const TweetCardResult = ({ tweetCountries, tweetDate, tweetFormat }: Props) => {
  const parsedCountries = computeResults({
    countries: tweetCountries,
    date: tweetDate.date,
    includeDate: tweetDate.includeDate,
    format: tweetFormat,
  });

  return parsedCountries.map((parsedCountry) => (
    <ResultLine
      key={parsedCountry.parsedTime}
      emoji={parsedCountry.emojis}
      time={parsedCountry.parsedTime}
    />
  ));
};

export default TweetCardResult;
