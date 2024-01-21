import { chechHourValue, chechMinuteValue } from "../../lib/timePickerChecks";
import { expect, test, describe } from "vitest";

describe("check Hour", () => {
  test("Parsing valid hour", () => {
    expect(chechHourValue("6")).toEqual({
      hourValue: "6",
      valid: true,
    });
  });

  test("Parsing max valid hour", () => {
    expect(chechHourValue("12")).toEqual({
      hourValue: "12",
      valid: true,
    });
  });

  test("Parsing min valid hour", () => {
    expect(chechHourValue("0")).toEqual({
      hourValue: "0",
      valid: true,
    });
  });

  test("Parsing invalid hour", () => {
    expect(chechHourValue("13")).toEqual({
      hourValue: "",
      valid: false,
    });
  });

  test("Is valid passing an empty string", () => {
    expect(chechHourValue("")).toEqual({
      hourValue: "",
      valid: true,
    });
  });
});

describe("check Minute", () => {
  test("Parsing valid minute", () => {
    expect(chechMinuteValue("30")).toEqual({
      minuteValue: "30",
      valid: true,
    });
  });

  test("Parsing max valid minute", () => {
    expect(chechMinuteValue("59")).toEqual({
      minuteValue: "59",
      valid: true,
    });
  });

  test("Parsing min valid minute", () => {
    expect(chechMinuteValue("0")).toEqual({
      minuteValue: "0",
      valid: true,
    });
  });

  test("Parsing invalid minute", () => {
    expect(chechMinuteValue("66")).toEqual({
      minuteValue: "",
      valid: false,
    });
  });

  test("Is valid passing an empty string", () => {
    expect(chechMinuteValue("")).toEqual({
      minuteValue: "",
      valid: true,
    });
  });
});
