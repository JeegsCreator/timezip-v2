"use client";

import * as React from "react";
import { format, set } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDate } from "@/context/useDate";

export function DatePicker() {
  const [state, setState] = React.useState<Date>();
  const { date, setDate, getDate, includeDate } = useDate();

  React.useEffect(() => {
    setState(getDate());
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          disabled={!includeDate}
          className={cn(
            "w-[120px] justify-center text-left font-normal",
            !state && "text-muted-foreground",
          )}
        >
          {state ? format(state, "dd MMM yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" sideOffset={12}>
        <Calendar
          mode="single"
          selected={state}
          onSelect={(value) => {
            if (value) {
              const newDate = set(getDate(), {
                date: value.getDate(),
                month: value.getMonth(),
                year: value.getFullYear(),
              });

              setDate(newDate);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
