import { Button } from "./ui/button";
import { chechHourValue, chechMinuteValue } from "@/lib/timePickerUtils";
import { format } from "date-fns";
import { Input } from "./ui/input";
import { useState, type ChangeEvent, useEffect } from "react";
import PeriodToogle from "./PeriodToogle.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  onChange?: (value: Date) => void;
  value?: Date;
};

const TimePicker = ({ onChange = () => {}, value }: Props) => {
  const defaultValue = value ? value : new Date("01/01/2024 13:00");
  const [time, setTime] = useState<Date>(defaultValue);

  const [hourValue, setHourValue] = useState(format(defaultValue, "hh"));
  const [minuteValue, setMinuteValue] = useState(format(defaultValue, "mm"));
  const [period, setPeriod] = useState(format(defaultValue, "a"));

  useEffect(() => {
    if (value) {
      setTime(value);
      setHourValue(format(value, "hh"));
      setMinuteValue(format(value, "mm"));
      setPeriod(format(value, "a"));
    }
  }, [value]);

  useEffect(() => {
    setTime((state) => {
      const hour = state.getHours();
      if (period === "PM") {
        const newHour = hour - 12;
        newHour >= 0 && state.setHours(newHour);
      } else if ("AM") {
        const newHour = hour + 12;
        newHour <= 24 && state.setHours(newHour);
      }
      onChange(state);
      return state;
    });
  }, [period]);

  const handleHourChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { hourValue, valid } = chechHourValue(e.target.value);

    if (valid) {
      const newDate = new Date(new Date("01/01/2024 13:00"));
      setHourValue(hourValue);
      const newHour =
        period === "AM" ? Number(hourValue) : Number(hourValue) + 12;

      newDate.setHours(
        hourValue === "12" ? (period === "AM" ? 0 : 12) : newHour,
      );
      setTime(newDate);
      onChange(newDate);
    } else {
      setHourValue(format(time, "h"));
    }
  };

  const handleMinuteChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { minuteValue, valid } = chechMinuteValue(e.target.value);

    if (valid) {
      const newDate = new Date(new Date("01/01/2024 13:00"));
      setMinuteValue(minuteValue);
      newDate.setMinutes(Number(minuteValue));
      setTime(newDate);
      onChange(newDate);
    } else {
      setMinuteValue(format(time, "m"));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="font-normal w-24 flex-center">
          {format(time, "hh:mm a")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit px-8" sideOffset={12}>
        <div className="flex flex-col gap-2">
          <span className="text-zinc-700 text-sm pl-1 w-full">Select time</span>
          <div className="flex gap-3">
            <div className="flex gap-1 items-center">
              <label>
                <Input
                  id="hour"
                  type="number"
                  className="text-3xl py-6 w-14 px-1 text-center"
                  onChange={handleHourChange}
                  onBlur={() => setHourValue(format(time, "hh"))}
                  value={hourValue}
                  required
                />
                <span className="pl-1 text-zinc-700 text-xs">Hour</span>
              </label>
              <span className="font-semibold text-3xl mb-6 mx-1">:</span>
              <label>
                <Input
                  id="minute"
                  type="number"
                  className="text-3xl py-6 w-14 px-1 text-center"
                  onChange={handleMinuteChange}
                  onBlur={() => setMinuteValue(format(time, "mm"))}
                  value={minuteValue}
                  required
                />
                <span className="pl-1 text-zinc-700 text-xs">Minute</span>
              </label>
            </div>
            <div>
              <PeriodToogle
                value={period}
                onValueChange={(value) => {
                  if (value === "AM" || value === "PM") {
                    setPeriod(value);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TimePicker;
