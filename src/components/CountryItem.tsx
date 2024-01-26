import { getFlagEmoji } from "@/lib/GetFlagEmoji";
import { Button } from "./ui/button";
import Plus from "./icons/Plus";
import clsx from "clsx";
import Check from "./icons/Check";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SixDots from "./icons/SixDots";
import X from "./icons/X";

type Props = {
  countryId: number;
  countryName: string;
  timezoneOffset: number;
  countryCode: string;
  isSelected?: boolean;
  onClick: () => void;
};

function parseTimeOffset(timezoneOffset: number) {
  if (timezoneOffset === 0) return "";
  if (timezoneOffset > 0) return `+${timezoneOffset}`;
  return timezoneOffset;
}

const CountryItem = ({
  countryId,
  countryName,
  timezoneOffset,
  countryCode,
  isSelected = false,
  onClick,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: countryId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes}>
      <Button
        variant="ghost"
        className={clsx(
          "group relative h-auto w-full justify-start rounded-none py-3 font-normal",
          isSelected && "cursor-auto",
        )}
        size="lg"
        title={countryName}
        onClick={() => !isSelected && onClick()}
      >
        <div
          {...listeners}
          className={clsx(
            "absolute bottom-0 left-0 top-0 cursor-pointer pl-4 pr-2 pt-3.5",
            !isSelected &&
              "opacity-0 transition-opacity group-hover:opacity-100",
          )}
        >
          {isSelected ? (
            <div className="-translate-x-1 text-lg">
              <SixDots />
            </div>
          ) : (
            <div className="pt-1">
              <Plus />
            </div>
          )}
        </div>
        <div className="flex w-full items-center pl-2">
          <span className=" inline-block max-w-[60%] overflow-x-hidden text-ellipsis text-base">
            {countryName}
          </span>
          <span className="ml-3 text-left text-xs font-light text-zinc-700">
            GMT
            {parseTimeOffset(timezoneOffset)}
          </span>
        </div>
        <span className="absolute right-6 font-emoji text-2xl opacity-40">
          {getFlagEmoji(countryCode)}
        </span>
        {isSelected && (
          <Button
            variant="ghost"
            className="absolute right-5 bg-red-200 px-2.5 py-2 text-red-600 opacity-0 hover:bg-red-300 hover:text-red-600 group-hover:opacity-100"
            onClick={(e) => {
              console.log("avocado");
              e.preventDefault();
              onClick();
            }}
          >
            <X />
          </Button>
        )}
      </Button>
    </li>
  );
};

export default CountryItem;
