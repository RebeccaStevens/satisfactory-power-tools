import type { Newtype } from "newtype-ts";
import { iso } from "newtype-ts";

export type Seconds = Newtype<{ readonly Seconds: unique symbol }, number>;
const isoSeconds = iso<Seconds>();
export function asSeconds(value: number) {
  return isoSeconds.from(value);
}

export type Minutes = Newtype<{ readonly Minutes: unique symbol }, number>;
const isoMinutes = iso<Minutes>();
export function asMinutes(value: number) {
  return isoMinutes.from(value);
}

export type Hours = Newtype<{ readonly Hours: unique symbol }, number>;
const isoHours = iso<Hours>();
export function asHours(value: number) {
  return isoHours.from(value);
}

export function minutesToSeconds(value: Minutes): Seconds {
  return isoSeconds.from(isoMinutes.to(value) * 60);
}

export function hoursToSeconds(value: Hours): Seconds {
  return minutesToSeconds(isoMinutes.from(isoHours.to(value) * 60));
}

export function secondsToMinutes(value: Seconds): Minutes {
  return isoMinutes.from(isoSeconds.to(value) / 60);
}

export function hoursToMinutes(value: Hours): Minutes {
  return isoMinutes.from(isoHours.to(value) * 60);
}

export function secondsToHours(value: Seconds): Hours {
  return minutesToHours(isoMinutes.from(isoSeconds.to(value) / 60));
}

export function minutesToHours(value: Minutes): Hours {
  return isoHours.from(isoMinutes.to(value) / 60);
}
