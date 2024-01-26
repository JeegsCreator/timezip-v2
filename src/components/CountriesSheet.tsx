import Plus from "./icons/Plus.tsx";
import { Button } from "./ui/button.tsx";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet.tsx";
import { ScrollArea } from "./ui/scroll-area.tsx";
import CountriesList from "./CountriesList.tsx";
import SelectedCountriesList from "./SelectedCountriesList.tsx";

const CountriesSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-1.5 font-normal"
        >
          <Plus />
          Add Country
        </Button>
      </SheetTrigger>
      <SheetContent className="h-[100svh] w-[500px] !max-w-[400px]">
        <div className="relative !grid h-full w-full grid-cols-1 grid-rows-5 gap-3">
          <SelectedCountriesList />
          <CountriesList />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CountriesSheet;
