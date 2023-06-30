import {
  type MultiplyUnits,
  type DivideUnits,
  mul,
  div,
  type Unit,
} from "uom-ts";

import { type MegaWatts } from "./rates";
import { type Hours } from "./time";

export type MegaJoules = Unit<{ MegaJoules: 1 }>;

// Unit<{ MegaJoules: 1; Seconds: -1; Hours: 1 }>;
export type MegaWattHours = MultiplyUnits<MegaWatts, Hours>;

// Unit<{Seconds: -1; Hours: 1 }>
type MegaJoulesToMegaWattHoursRate = DivideUnits<MegaWattHours, MegaJoules>;

export function megaJoulesToMegaWattHours(value: MegaJoules): MegaWattHours {
  return mul(value, 3600 as MegaJoulesToMegaWattHoursRate);
}

export function megaWattHoursToMegaJoules(value: MegaWattHours): MegaJoules {
  return div(value, 3600 as MegaJoulesToMegaWattHoursRate);
}
