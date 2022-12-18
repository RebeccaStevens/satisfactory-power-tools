import assert from "node:assert/strict";

import type { Newtype } from "newtype-ts";
import { iso } from "newtype-ts";

export type Id = Newtype<{ readonly Id: unique symbol }, string>;
const isoId = iso<Id>();
export function asId(value: string) {
  return isoId.from(value);
}

export type Name = Newtype<{ readonly Name: unique symbol }, string>;
const isoName = iso<Name>();
export function asName(value: string) {
  return isoName.from(value);
}

export type Points = Newtype<{ readonly Points: unique symbol }, number>;
const isoPoints = iso<Points>();
export function asPoints(value: number) {
  return isoPoints.from(value);
}

export type ColorString = Newtype<
  { readonly ColorString: unique symbol },
  string
>;
const isoColorString = iso<ColorString>();
export function asColorString(value: string | null) {
  return isoColorString.from(value ?? "000000ff");
}

export type ItemTransporter = Newtype<
  { readonly ItemTransporter: unique symbol },
  "belt" | "pipe"
>;
const isoItemTransporter = iso<ItemTransporter>();
export function asItemTransporter(value: string) {
  assert(value === "belt" || value === "pipe");
  return isoItemTransporter.from(value);
}

export type Hz = Newtype<{ readonly Hz: unique symbol }, number>;
const isoHz = iso<Hz>();
export function asHz(value: number) {
  return isoHz.from(value);
}

export type PowerExponent = Newtype<
  { readonly PowerExponent: unique symbol },
  number
>;
const isoPowerExponent = iso<PowerExponent>();
export function asPowerExponent(value: number) {
  return isoPowerExponent.from(value);
}

export type Potential = Newtype<{ readonly Potential: unique symbol }, number>;
const isoPotential = iso<Potential>();
export function asPotential(value: number) {
  return isoPotential.from(value);
}

export type Quantity = Newtype<{ readonly Quantity: unique symbol }, number>;
const isoQuantity = iso<Quantity>();
export function asQuantity(value: number) {
  return isoQuantity.from(value);
}

export type VariablePowerConsumptionConstant = Newtype<
  { readonly VariablePowerConsumptionConstant: unique symbol },
  number
>;
const isoVariablePowerConsumptionConstant =
  iso<VariablePowerConsumptionConstant>();
export function asVariablePowerConsumptionConstant(value: number) {
  return isoVariablePowerConsumptionConstant.from(value);
}

export type VariablePowerConsumptionFactor = Newtype<
  { readonly VariablePowerConsumptionFactor: unique symbol },
  number
>;
const isoVariablePowerConsumptionFactor = iso<VariablePowerConsumptionFactor>();
export function asVariablePowerConsumptionFactor(value: number) {
  return isoVariablePowerConsumptionFactor.from(value);
}
