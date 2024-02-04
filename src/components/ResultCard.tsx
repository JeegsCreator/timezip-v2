import { useComputeResult } from "@/hooks/useComputeResult.ts";
import ResultLine from "./ResultLine.tsx";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Copy from "@/components/icons/Copy.tsx";
import { ScrollArea } from "./ui/scroll-area.tsx";
import { useDate } from "@/context/useDate.ts";
import { format } from "date-fns";
import { useRef } from "react";
import { toast } from "sonner";

const ResultCard = () => {
  const { parsedCountries } = useComputeResult();
  const { includeDate, getDate } = useDate();
  const resultRef = useRef<HTMLDivElement>(null);

  return (
    <Card className="relative my-20 flex min-h-[270px] w-[500px] items-center bg-white/50 backdrop-blur-sm">
      <Button
        variant="outline"
        className="absolute right-3 top-3 z-50 flex items-center gap-2 font-normal text-zinc-500"
        onClick={() => {
          const content = resultRef.current?.textContent?.split(" ").join("\n");
          if (typeof content === "string")
            navigator.clipboard.writeText(content);
          toast.success("Content pasted in clipboard");
        }}
      >
        <Copy />
        Copy
      </Button>
      <CardContent className="w-full py-4 pl-0 pr-4 text-lg">
        {parsedCountries.length > 0 ? (
          <ScrollArea className="h-[230px] w-full px-12 py-2">
            <div
              className="flex min-h-full flex-col justify-center"
              ref={resultRef}
            >
              {includeDate && (
                <p className="mb-2 text-base text-zinc-700">
                  {format(getDate(), "dd MMM yyyy")}
                  {" "}
                </p>
              )}
              {parsedCountries.map((parsedCountry) => (
                <ResultLine
                  key={parsedCountry.parsedTime}
                  emoji={parsedCountry.emojis}
                  time={parsedCountry.parsedTime}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p>Don't have any country selected</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultCard;
