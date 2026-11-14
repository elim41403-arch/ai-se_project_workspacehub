interface BookingFormState {
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
}

export const validateBookingFormState = (
    formState: BookingFormState,
  ): Partial<Record<keyof BookingFormState, string>> => {
    const errors: Partial<Record<keyof BookingFormState, string>> = {};

    if (!formState.title.trim()) {
      errors.title = "Booking title is required";
    } else if (formState.title.trim().length <= 1) {
      errors.title = "Booking title must be longer than 1 character";
    }

    if (!formState.startsAt) {
      errors.startsAt = "Start and end times are required";
    }
    if (!formState.endsAt) {
      errors.endsAt = "Start and end times are required";
    }

    const startsAt = Date.parse(formState.startsAt);
    const endsAt = Date.parse(formState.endsAt);

    if (Number.isNaN(startsAt) || Number.isNaN(endsAt)) {
      if (Number.isNaN(startsAt) && formState.startsAt) {
        errors.startsAt = "Enter valid start and end times";
      }
      if (Number.isNaN(endsAt) && formState.endsAt) {
        errors.endsAt = "Enter valid start and end times";
      }
    } else if (endsAt <= startsAt) {
      errors.endsAt = "End time must be after start time";
    }

    return errors;
  };
