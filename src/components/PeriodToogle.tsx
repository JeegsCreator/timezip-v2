import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

interface Props {
  value: string;
  onValueChange: (value: string) => void;
}

const PeriodToogle = ({ onValueChange, value }: Props) => {
  return (
    <ToggleGroup
      type="single"
      className="flex flex-col gap-0 shadow-sm rounded-md"
      value={value}
      onValueChange={onValueChange}
    >
      <ToggleGroupItem value="AM" asChild>
        <Button
          variant={"outline"}
          className="font-normal rounded-b-none text-xs py-0 w-8 h-[25px] shadow-none data-[state=on]:text-black text-zinc-700 data-[state=on]:bg-zinc-200 data-[state=on]:font-semibold"
          size="sm"
        >
          AM
        </Button>
      </ToggleGroupItem>
      <ToggleGroupItem value="PM" asChild>
        <Button
          variant={"outline"}
          className="font-normal rounded-t-none border-t-0 text-xs py-0 w-8 h-[25px] shadow-none data-[state=on]:text-black text-zinc-700 data-[state=on]:bg-zinc-200 data-[state=on]:font-semibold"
          size="sm"
        >
          PM
        </Button>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default PeriodToogle;
