import { type Newtype } from "newtype-ts";
import { iso } from "newtype-ts";

export type Joules = Newtype<{ readonly Joules: unique symbol }, number>;
const isoJoules = iso<Joules>();
export function asJoules(value: number) {
  return isoJoules.from(value);
}

export type MegaJoules = Newtype<
  { readonly MegaJoules: unique symbol },
  number
>;
const isoMegaJoules = iso<MegaJoules>();
export function asMegaJoules(value: number) {
  return isoMegaJoules.from(value);
}

export type MegaWattHours = Newtype<
  { readonly MegaJoules: unique symbol },
  number
>;
const isoMegaWattHours = iso<MegaWattHours>();
export function asMegaWattHours(value: number) {
  return isoMegaWattHours.from(value);
}

export function megaJoulesToJoules(value: MegaJoules): Joules {
  return isoJoules.from(isoMegaJoules.to(value) * 1000);
}

export function joulesToMegaJoules(value: Joules): MegaJoules {
  return isoMegaJoules.from(isoJoules.to(value) / 1000);
}

export function megaJoulesToMegaWattHours(value: MegaJoules): MegaWattHours {
  return isoMegaWattHours.from(isoMegaJoules.to(value) * 3600);
}
