import { type Unit, type DivideUnits, div } from "uom-ts";

import {
  type Quantity,
  type FluidQuantity,
  type ItemQuantity,
  type PointsQuantity,
} from "./amount";
import { type Seconds, type Minutes, secondsToMinutes } from "./time";

export type QuantityPerMinute =
  | ItemQuantityPerMinute
  | FluidQuantityPerMinute
  | PointsQuantityPerMinute;

export type ItemQuantityPerMinute = DivideUnits<ItemQuantity, Minutes>;
export type FluidQuantityPerMinute = DivideUnits<FluidQuantity, Minutes>;
export type PointsQuantityPerMinute = DivideUnits<PointsQuantity, Minutes>;

export function toQuantityPerMinute(
  quantity: ItemQuantity,
  duration: Seconds,
): ItemQuantityPerMinute;
export function toQuantityPerMinute(
  quantity: FluidQuantity,
  duration: Seconds,
): FluidQuantityPerMinute;
export function toQuantityPerMinute(
  quantity: PointsQuantity,
  duration: Seconds,
): PointsQuantityPerMinute;
export function toQuantityPerMinute(
  quantity: Quantity,
  duration: Seconds,
): QuantityPerMinute;
export function toQuantityPerMinute(
  quantity: Quantity,
  duration: Seconds,
): unknown {
  return div(quantity, secondsToMinutes(duration));
}

export type Hertz = Unit<{ Seconds: -1 }>;

export type MegaWatts = Unit<{ MegaJoules: 1; Seconds: -1 }>;
