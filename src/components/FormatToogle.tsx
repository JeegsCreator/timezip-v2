import { useTemplate } from "@/context/useTemplate";
import { Separator } from "./ui/separator";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import clsx from "clsx";

const FormatToogle = () => {
  const { format, setFormat } = useTemplate();

  return (
    <div>
      <ToggleGroup
        type="single"
        className="rounded-md border border-zinc-400 p-1"
        size={"sm"}
        value={format}
        onValueChange={(value) => setFormat(value)}
      >
        <ToggleGroupItem
          className="mr-px flex justify-center text-sm font-normal"
          value="HH[H]"
        >
          24H
        </ToggleGroupItem>
        <Separator orientation="vertical" />
        <ToggleGroupItem
          className="flex justify-center text-sm font-normal"
          value="hh:mm A"
        >
          12:00 PM
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default FormatToogle;
