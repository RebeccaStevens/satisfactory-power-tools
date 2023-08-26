import { type Unit } from "uom-ts";

export type Quantity = ItemQuantity | FluidQuantity | PointsQuantity;
export type ItemQuantity = Unit<{ Items: 1 }>;
export type FluidQuantity = Unit<{ Meters: 3 }>;
export type PointsQuantity = Unit<{ Points: 1 }>;
