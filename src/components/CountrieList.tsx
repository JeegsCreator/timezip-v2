import Plus from "./icons/Plus.tsx";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import timezones from "@/timezones.json";
import { Separator } from "./ui/separator.tsx";
import { ScrollArea } from "./ui/scroll-area.tsx";
import { getFlagEmoji } from "@/lib/GetFlagEmoji.ts";

console.log(timezones);
const CountrieList = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="font-normal flex gap-1.5 items-center"
        >
          <Plus />
          Add Country
        </Button>
      </SheetTrigger>
      <SheetContent className="h-[100svh]">
        <SheetHeader>
          <SheetTitle>Selected countries</SheetTitle>
          <SheetDescription className="text-pretty">
            <p>
              Select all the countries you want to get its respective times.
            </p>
          </SheetDescription>
        </SheetHeader>
        <div className="pt-8 relative h-full pb-[76px]">
          <ScrollArea className="h-full pr-3 relative border rounded-md">
            <ul>
              {timezones.map((timezone, i) => {
                const capital = timezone.Timezone.find((t) => t.capital);
                console.log(capital?.offset);
                return (
                  <li className="pr-2">
                    <Button
                      variant="ghost"
                      className="w-full font-normal rounded-none pl-4 justify-between h-fit py-2"
                      size="lg"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3 text-base">
                          <span className="font-emoji text-xl">
                            {getFlagEmoji(timezone.countryCode)}
                          </span>
                          <span>{timezone.countryName}</span>
                        </div>
                        <span className="text-xs text-zinc-700 text-left pl-10">
                          GMT
                          {capital?.offset === 0
                            ? ""
                            : capital?.offset && capital.offset > 0
                              ? `+${capital?.offset}`
                              : capital?.offset}
                        </span>
                      </div>
                    </Button>
                    {i !== timezones.length - 1 && <Separator />}
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CountrieList;
