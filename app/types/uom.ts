import * as uom from "effect-uom";

export type ItemUnit = uom.Unit<{ item: 1 }>;
export const ItemUnit: (value: number) => ItemUnit = uom.brandUom;

export type CycleUnit = uom.Unit<{ cycle: 1 }>;
export const CycleUnit: (value: number) => CycleUnit = uom.brandUom;

export type ItemPerCycle = uom.Divide<ItemUnit, CycleUnit>;
export const ItemPerCycle: (value: number) => ItemPerCycle = uom.brandUom;

export type ItemPerSecond = uom.Divide<ItemUnit, uom.Second>;
export const ItemPerSecond: (value: number) => ItemPerSecond = uom.brandUom;
