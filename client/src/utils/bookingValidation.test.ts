import { describe, expect, it } from "vitest";
import { validateBookingFormState } from "./bookingValidation";

const validForm = {
  title: "Planning session",
  description: "",
  startsAt: "2026-11-14T10:00:00.000Z",
  endsAt: "2026-11-14T11:00:00.000Z",
};

describe("validateBookingFormState", () => {
  it("returns required-field errors for blank title and times", () => {
    expect(
      validateBookingFormState({
        title: "",
        description: "",
        startsAt: "",
        endsAt: "",
      }),
    ).toEqual({
      title: "Booking title is required",
      startsAt: "Start and end times are required",
      endsAt: "Start and end times are required",
    });
  });

  it("rejects a title with only one non-whitespace character", () => {
    expect(
      validateBookingFormState({ ...validForm, title: " A " }),
    ).toEqual({
      title: "Booking title must be longer than 1 character",
    });
  });

  it("returns an error for an invalid date string", () => {
    expect(
      validateBookingFormState({ ...validForm, startsAt: "not-a-date" }),
    ).toEqual({
      startsAt: "Enter valid start and end times",
    });
  });

  it("requires the end time to be after the start time", () => {
    expect(
      validateBookingFormState({
        ...validForm,
        startsAt: "2026-11-14T11:00:00.000Z",
        endsAt: "2026-11-14T10:00:00.000Z",
      }),
    ).toEqual({ endsAt: "End time must be after start time" });
  });

  it("rejects equal start and end times", () => {
    expect(
      validateBookingFormState({
        ...validForm,
        endsAt: validForm.startsAt,
      }),
    ).toEqual({ endsAt: "End time must be after start time" });
  });

  it("returns no errors for a valid booking", () => {
    expect(validateBookingFormState(validForm)).toEqual({});
  });
});