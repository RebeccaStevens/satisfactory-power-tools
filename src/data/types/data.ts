import { assert } from "chai";
import { type Newtype } from "newtype-ts";
import { iso } from "newtype-ts";

export type ColorString = Newtype<
  { readonly ColorString: unique symbol },
  string
>;
export const isoColorString = iso<ColorString>();
export function asColorString(value: string | null) {
  return isoColorString.from(value ?? "000000ff");
}

export type ItemTransporter = Newtype<
  { readonly ItemTransporter: unique symbol },
  "belt" | "pipe" | "wire"
>;
export const isoItemTransporter = iso<ItemTransporter>();
export function asItemTransporter(value: string) {
  assert(value === "belt" || value === "pipe" || value === "wire");
  return isoItemTransporter.from(value);
}
export const belt = asItemTransporter("belt");
export const pipe = asItemTransporter("pipe");
export const wire = asItemTransporter("wire");

export type Potential = Newtype<{ readonly Potential: unique symbol }, number>;
export const isoPotential = iso<Potential>();
export function asPotential(value: number) {
  return isoPotential.from(value);
}

export type VariablePowerConsumptionConstant = Newtype<
  { readonly VariablePowerConsumptionConstant: unique symbol },
  number
>;
export const isoVariablePowerConsumptionConstant =
  iso<VariablePowerConsumptionConstant>();
export function asVariablePowerConsumptionConstant(value: number) {
  return isoVariablePowerConsumptionConstant.from(value);
}

export type VariablePowerConsumptionFactor = Newtype<
  { readonly VariablePowerConsumptionFactor: unique symbol },
  number
>;
export const isoVariablePowerConsumptionFactor =
  iso<VariablePowerConsumptionFactor>();
export function asVariablePowerConsumptionFactor(value: number) {
  return isoVariablePowerConsumptionFactor.from(value);
}

export type Location3D = Newtype<
  { readonly Location3D: unique symbol },
  Point3D
>;
export const isoLocation3D = iso<Location3D>();
export function asLocation3D(value: Readonly<Point3D>) {
  return isoLocation3D.from(value);
}

export type Rotation3D = Newtype<
  { readonly Rotation3D: unique symbol },
  Attitude3D
>;
export const isoRotation3D = iso<Rotation3D>();
export function asRotation3D(value: Readonly<Attitude3D>) {
  return isoRotation3D.from(value);
}

export type Scale3D = Newtype<{ readonly Scale3D: unique symbol }, Point3D>;
export const isoScale3D = iso<Scale3D>();
export function asScale3D(value: Readonly<Point3D>) {
  return isoScale3D.from(value);
}

export type ResourcePurity = Newtype<
  { readonly ResourcePurity: unique symbol },
  "impure" | "normal" | "pure"
>;
export const isoResourcePurity = iso<ResourcePurity>();
export function asResourcePurity(value: string) {
  assert(value === "impure" || value === "normal" || value === "pure");
  return isoResourcePurity.from(value);
}
export const impure = asResourcePurity("impure");
export const normal = asResourcePurity("normal");
export const pure = asResourcePurity("pure");

export type Point3D = {
  x: number;
  y: number;
  z: number;
};

export type Attitude3D = {
  roll: number;
  pitch: number;
  yaw: number;
};
