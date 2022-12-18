import type { Newtype } from "newtype-ts";
import { iso } from "newtype-ts";

export type Watts = Newtype<{ readonly Watts: unique symbol }, number>;
const isoWatts = iso<Watts>();
export function asWatts(value: number) {
  return isoWatts.from(value);
}

export type MegaWatts = Newtype<{ readonly MegaWatts: unique symbol }, number>;
const isoMegaWatts = iso<MegaWatts>();
export function asMegaWatts(value: number) {
  return isoMegaWatts.from(value);
}

export function megaWattsToWatts(value: MegaWatts): Watts {
  return isoWatts.from(isoMegaWatts.to(value) * 1000);
}

export function wattsToMegaWatts(value: Watts): MegaWatts {
  return isoMegaWatts.from(isoWatts.to(value) / 1000);
}
