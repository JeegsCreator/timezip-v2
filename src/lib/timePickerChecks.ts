import { isValid } from "date-fns";

export function chechHourValue(hour: string) {
  let newHourValue = "";
  let valid = false;

  if (hour === "") {
    valid = true;
    return { newHourValue, valid };
  }

  const newHour = Number(hour);
  const newDate = new Date(new Date("01/01/2024 13:00"));
  newDate.setHours(newHour);

  const isInRange = newHour <= 12 && newHour >= 0;

  if (isInRange && isValid(newDate)) {
    newHourValue = `${newHour}`;
    valid = true;
  }

  return { newHourValue, valid };
}

export function chechMinuteValue(minute: string) {
  let newMinuteValue = "";
  let valid = false;

  if (minute === "") {
    valid = true;
    return { newMinuteValue, valid };
  }

  const newMinute = Number(minute);
  const newDate = new Date(new Date("01/01/2024 13:00"));
  newDate.setMinutes(newMinute);

  const isInRange = newMinute <= 59 && newMinute >= 0;

  if (isInRange && isValid(newDate)) {
    newMinuteValue = `${newMinute}`;
    valid = true;
  }

  return { newMinuteValue, valid };
}
