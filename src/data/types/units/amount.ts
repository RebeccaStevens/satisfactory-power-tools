import { type Unit } from "uom-ts";

export type Quantity = ItemQuantity | FluidQuantity;
export type ItemQuantity = Unit<{ Items: 1 }>;
export type FluidQuantity = Unit<{ Meters: 3 }>;
