import { useComputeResult } from "@/hooks/useComputeResult.ts";
import ResultLine from "./ResultLine.tsx";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Copy from "@/components/icons/Copy.tsx";

const ResultCard = () => {
  const { parsedCountries } = useComputeResult();

  return (
    <Card className="relative my-20 flex min-h-[260px] w-[500px] items-center bg-white/50 backdrop:blur-sm">
      <Button
        variant="outline"
        className="absolute right-4 top-4 flex items-center gap-2 font-normal text-zinc-500"
      >
        <Copy />
        Copy
      </Button>
      <CardContent className="px-12 py-4 text-lg">
        {parsedCountries.length > 0 ? (
          parsedCountries.map((parsedCountry) => (
            <ResultLine
              emoji={parsedCountry.emojis}
              time={parsedCountry.parsedTime}
            />
          ))
        ) : (
          <p>Don't have any country selected</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultCard;
