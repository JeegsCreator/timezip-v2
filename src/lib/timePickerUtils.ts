import { isValid } from "date-fns";

export function chechHourValue(hour: string) {
  let hourValue = "";
  let valid = false;

  // if empty don't check it
  if (hour !== "") {
    const newHour = Number(hour);

    // If the number is invalid, don't change it
    if (newHour <= 12 && newHour >= 0) {
      // clone the time state, set the new hour and check if it's valid.
      // If it is, change it
      const newDate = new Date(new Date("01/01/2024 13:00"));
      newDate.setHours(newHour);

      if (isValid(newDate)) {
        hourValue = `${newHour}`;
        valid = true;
      }
    }
  } else {
    valid = true;
  }

  return { hourValue, valid };
}

export function chechMinuteValue(minute: string) {
  let minuteValue = "";
  let valid = false;

  // if empty don't check it
  if (minute !== "") {
    const newMinute = Number(minute);

    // If the number is invalid, don't change it
    if (newMinute <= 59 && newMinute >= 0) {
      // clone the time state, set the new minute and check if it's valid.
      // If it is, change it
      const newDate = new Date(new Date("01/01/2024 13:00"));
      newDate.setMinutes(newMinute);

      if (isValid(newDate)) {
        minuteValue = `${newMinute}`;
        valid = true;
      }
    }
  } else {
    valid = true;
  }

  return { minuteValue, valid };
}
