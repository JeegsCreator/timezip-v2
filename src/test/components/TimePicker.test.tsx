import { test, expect, beforeEach } from "vitest";
import TimePicker from "../../components/TimePicker.jsx";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

beforeEach(async () => {
  render(<TimePicker />);
});

function validatePickedTime(expectedTime: string) {
  expect(screen.getByText(expectedTime)).not.toBeNull();
}

test("TimePicker component works properly.", async () => {
  validatePickedTime("01:00 PM");
  await userEvent.click(screen.getByText("01:00 PM"));

  expect(screen.getByText("Select time")).not.toBeNull();

  const hourInput = screen.getByLabelText("Hour");
  await fireEvent.change(hourInput, { target: { value: "12" } });
  validatePickedTime("12:00 PM");

  await fireEvent.change(hourInput, { target: { value: "13" } });
  validatePickedTime("12:00 PM");

  const minuteInput = screen.getByLabelText("Minute");
  await fireEvent.change(minuteInput, { target: { value: "20" } });
  validatePickedTime("12:20 PM");

  await fireEvent.change(minuteInput, { target: { value: "60" } });
  validatePickedTime("12:20 PM");

  const amButton = screen.getByText("AM");
  const pmButton = screen.getByText("PM");

  await userEvent.click(amButton);
  await setTimeout(() => validatePickedTime("12:20 AM"), 50);

  await userEvent.click(pmButton);
  await setTimeout(() => validatePickedTime("12:20 PM"), 50);
});
