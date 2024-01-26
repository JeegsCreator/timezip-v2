import { Button } from "./ui/button";
import { chechHourValue, chechMinuteValue } from "@/lib/timePickerChecks.ts";
import { format } from "date-fns";
import { Input } from "./ui/input";
import { useState, type ChangeEvent, useEffect, useMemo } from "react";
import PeriodToogle from "./PeriodToogle.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDate } from "@/context/useDate.ts";

const TimePicker = () => {
  // const [time, setTime] = useState<Date>();
  const { date, setDate, getDate } = useDate();

  const InitalizeValue = getDate();

  const [time, setTime] = useState<Date>();
  const [hourValue, setHourValue] = useState(format(InitalizeValue, "hh"));
  const [minuteValue, setMinuteValue] = useState(format(InitalizeValue, "mm"));
  const [period, setPeriod] = useState(format(InitalizeValue, "a"));

  useEffect(() => {
    const newDate = getDate();

    setTime(newDate);
    setHourValue(format(newDate, "hh"));
    setMinuteValue(format(newDate, "mm"));
    setPeriod(format(newDate, "a"));
  }, [date]);
  const handlePeriodChange = (value: "AM" | "PM") => {
    const state = getDate();

    console.log(typeof state);
    const hour = state.getHours();
    if (value === "AM") {
      const newHour = hour - 12;
      newHour >= 0 && state.setHours(newHour);
    } else if (value === "PM") {
      const newHour = hour + 12;
      newHour <= 24 && state.setHours(newHour);
    }

    setDate(state);
  };

  const handleHourChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { hourValue, valid } = chechHourValue(e.target.value);

    if (valid) {
      const newDate = new Date(date);
      setHourValue(hourValue);
      const newHour =
        period === "AM" ? Number(hourValue) : Number(hourValue) + 12;

      newDate.setHours(
        hourValue === "12" ? (period === "AM" ? 0 : 12) : newHour,
      );
      setDate(newDate);
    } else {
      // ? works with string?
      setHourValue(format(date, "h"));
    }
  };

  const handleMinuteChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { minuteValue, valid } = chechMinuteValue(e.target.value);

    if (valid) {
      const newDate = new Date(date);
      setMinuteValue(minuteValue);
      newDate.setMinutes(Number(minuteValue));
      setDate(newDate);
    } else {
      // ? works with string?
      setMinuteValue(format(date, "m"));
    }
  };

  return useMemo(
    () => (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex-center w-24 font-normal">
            {time ? (
              format(time, "hh:mm a")
            ) : (
              <span className="text-zinc-500">Pick a time</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit px-8" sideOffset={12}>
          <div className="flex flex-col gap-2">
            <span className="w-full pl-1 text-sm text-zinc-700">
              Select time
            </span>
            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <label>
                  <Input
                    id="hour"
                    type="number"
                    className="w-14 px-1 py-6 text-center text-3xl"
                    onChange={handleHourChange}
                    onBlur={() => time && setHourValue(format(time, "hh"))}
                    value={hourValue}
                    required
                  />
                  <span className="pl-1 text-xs text-zinc-700">Hour</span>
                </label>
                <span className="mx-1 mb-6 text-3xl font-semibold">:</span>
                <label>
                  <Input
                    id="minute"
                    type="number"
                    className="w-14 px-1 py-6 text-center text-3xl"
                    onChange={handleMinuteChange}
                    onBlur={() => time && setMinuteValue(format(time, "mm"))}
                    value={minuteValue}
                    required
                  />
                  <span className="pl-1 text-xs text-zinc-700">Minute</span>
                </label>
              </div>
              <div>
                <PeriodToogle
                  value={period}
                  onValueChange={(value) => {
                    if (value === "AM" || value === "PM") {
                      setPeriod(value);
                      handlePeriodChange(value);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    ),
    [time],
  );
};

export default TimePicker;
