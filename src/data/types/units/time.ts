import { type DivideUnits, type Unit, mul, div } from "uom-ts";

export type Seconds = Unit<{ Seconds: 1 }>;
export type Minutes = Unit<{ Minutes: 1 }>;
export type Hours = Unit<{ Hours: 1 }>;

// Unit<{ Seconds: 1, Minutes: -1 }>
type MinutesToSecondsRate = DivideUnits<Seconds, Minutes>;

// Unit<{ Minutes: 1, Hours: -1 }>
type HoursToMinutesRate = DivideUnits<Minutes, Hours>;

export function secondsToMinutes(value: Seconds): Minutes {
  return div(value, 60 as MinutesToSecondsRate);
}

export function secondsToHours(value: Seconds): Hours {
  return div(secondsToMinutes(value), 60 as HoursToMinutesRate);
}

export function minutesToSeconds(value: Minutes): Seconds {
  return mul(value, 60 as MinutesToSecondsRate);
}

export function minutesToHours(value: Minutes): Hours {
  return div(value, 60 as HoursToMinutesRate);
}

export function hoursToSeconds(value: Hours): Seconds {
  return mul(hoursToMinutes(value), 60 as MinutesToSecondsRate);
}

export function hoursToMinutes(value: Hours): Minutes {
  return mul(value, 60 as HoursToMinutesRate);
}
