import { isValid } from "date-fns";

export function chechHourValue(hour: string) {
  let hourValue = "";
  let valid = false;

  if (hour === "") {
    valid = true;
    return { hourValue, valid };
  }

  const newHour = Number(hour);
  const newDate = new Date(new Date("01/01/2024 13:00"));
  newDate.setHours(newHour);

  const isInRange = newHour <= 12 && newHour >= 0;

  if (isInRange && isValid(newDate)) {
    hourValue = `${newHour}`;
    valid = true;
  }

  return { hourValue, valid };
}

export function chechMinuteValue(minute: string) {
  let minuteValue = "";
  let valid = false;

  if (minute === "") {
    valid = true;
    return { minuteValue, valid };
  }

  const newMinute = Number(minute);
  const newDate = new Date(new Date("01/01/2024 13:00"));
  newDate.setMinutes(newMinute);

  const isInRange = newMinute <= 59 && newMinute >= 0;

  if (isInRange && isValid(newDate)) {
    minuteValue = `${newMinute}`;
    valid = true;
  }

  return { minuteValue, valid };
}
