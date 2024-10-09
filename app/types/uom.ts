import { Brand } from "effect";
import type * as uom from "uom-types";

import type { Float, Int } from "~/types/common";

export type Unitless = Brand.Branded<uom.Unitless, "uom">;
export const Unitless = Brand.refined<Unitless>(
  (n) => typeof n === "number",
  (n) => Brand.error(`Expected ${n} to be a number`),
) as unknown as (value: Int | Float) => Unitless;

export type MegaJoule = Brand.Branded<uom.Mega<uom.Joule>, "uom">;
export const MegaJoule = Brand.refined<MegaJoule>(
  (n) => typeof n === "number",
  (n) => Brand.error(`Expected ${n} to be a number`),
) as unknown as (value: Float) => MegaJoule;

export type MegaWatt = Brand.Branded<uom.Mega<uom.Watt>, "uom">;
export const MegaWatt = Brand.refined<MegaWatt>(
  (n) => typeof n === "number",
  (n) => Brand.error(`Expected ${n} to be a number`),
) as unknown as (value: Float) => MegaWatt;

export type Gray = Brand.Branded<uom.Gray, "uom">;
export const Gray = Brand.refined<Gray>(
  (n) => typeof n === "number",
  (n) => Brand.error(`Expected ${n} to be a number`),
) as unknown as (value: Float) => Gray;

export type Second = Brand.Branded<uom.Second, "uom">;
export const Second = Brand.refined<Second>(
  (n) => typeof n === "number",
  (n) => Brand.error(`Expected ${n} to be a number`),
) as unknown as (value: Float) => Second;

export type ItemUnit = Brand.Branded<uom.AbstractUnit<{ item: 1 }>, "uom">;
export const ItemUnit = Brand.refined<ItemUnit>(
  (n) => typeof n === "number",
  (n) => Brand.error(`Expected ${n} to be a number`),
) as unknown as (value: Int) => ItemUnit;

export type ItemsPerCycle = Brand.Branded<
  uom.AbstractUnit<{ item: 1; cycle: -1 }>,
  "uom"
>;
export const ItemsPerCycle = Brand.refined<ItemsPerCycle>(
  (n) => typeof n === "number",
  (n) => Brand.error(`Expected ${n} to be a number`),
) as unknown as (value: Int) => ItemsPerCycle;
