import Smile from "./icons/Smile";
import { Separator } from "./ui/separator";
import { Toggle } from "./ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

const FormatToogle = () => {
  return (
    <div>
      <ToggleGroup
        type="multiple"
        className="p-1 border border-zinc-400 rounded-md"
        size={"sm"}
      >
        <ToggleGroupItem className="text-sm font-normal mr-px" value="24h">
          24H
        </ToggleGroupItem>
        <Separator orientation="vertical" />
        <ToggleGroupItem className="text-sm font-normal mr-px" value="emoji">
          <Smile />
        </ToggleGroupItem>
        <Separator orientation="vertical" />
        <ToggleGroupItem className="text-sm font-normal mr-px" value="name">
          <span className="pb-px">Name</span>
        </ToggleGroupItem>
        <Separator orientation="vertical" />
        <ToggleGroupItem className="text-sm font-normal" value="format">
          12:00
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default FormatToogle;
