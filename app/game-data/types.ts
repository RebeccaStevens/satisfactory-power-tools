import { Brand } from "effect";
import type { Branded } from "effect/Brand";
import type * as uom from "effect-uom";

import type {
  Buildable,
  Building,
  Equipment,
  Item,
  Machine,
  Recipe,
  Schematic,
  Vehicle,
} from "~/game-data/generate/upgrade/types";
import type { Int } from "~/types";

export type GameData = {
  classes: Map<ClassName, Buildable | Building | Item | Machine | Recipe | Equipment>;
  buildables: Set<Buildable>;
  buildings: Set<Building>;
  items: Set<Item>;
  machines: Set<Machine>;
  recipes: Set<Recipe>;
  equipments: Set<Equipment>;
  vehicles: Set<Vehicle>;
  schematics: Set<Schematic>;
};

const brandNonEmptyString = Brand.refined<Branded<string, string | symbol>>(
  (n) => typeof n === "string" && n.length > 0,
  (n) => Brand.error(`Expected ${n} to be a nonempty string`),
) as unknown as <V extends string, T extends string | symbol>(value: string) => Branded<V, T>;

const brandInteger = Brand.refined<Branded<number, string | symbol>>(
  (n) => typeof n === "number" && Number.isInteger(n),
  (n) => Brand.error(`Expected ${n} to be an integer`),
) as unknown as <V extends number, T extends string | symbol>(value: number) => Branded<V, T>;

export type Id = Brand.Branded<string, "Id">;
export const Id: (value: string) => Id = brandNonEmptyString;

export type ClassName = Brand.Branded<string, "ClassName">;
export const ClassName: (value: string) => ClassName = brandNonEmptyString;

export type ItemUnit = uom.Unit<{ item: 1 }>;
export const ItemUnit: (value: number) => ItemUnit = brandInteger;

export type CycleUnit = uom.Unit<{ cycle: 1 }>;
export const CycleUnit: (value: number) => CycleUnit = brandInteger;

export type ItemPerCycle = uom.Divide<ItemUnit, CycleUnit>;
export const ItemPerCycle: (value: number) => ItemPerCycle = brandInteger;

export type ItemPerSecond = uom.Divide<ItemUnit, uom.Second>;
export const ItemPerSecond: (value: number) => ItemPerSecond = brandInteger;

export type ResourceSinkPoint = Brand.Branded<number, "ResourceSinkPoints">;
export const ResourceSinkPoint: (value: number) => ResourceSinkPoint = brandInteger;

export type Color = Brand.Branded<
  {
    red: Int;
    green: Int;
    blue: Int;
    alpha: Int;
  },
  "Color"
>;
export const Color = Brand.refined<Color>(
  ({ red, green, blue, alpha }) =>
    !Number.isNaN(red) && !Number.isNaN(green) && !Number.isNaN(blue) && !Number.isNaN(alpha),
  (n) => Brand.error(`Expected ${JSON.stringify(n)} to be a color with red, green, blue and alpha channels`),
);

export type Point2D = Brand.Branded<
  {
    x: uom.Centi<uom.Meter>;
    y: uom.Centi<uom.Meter>;
  },
  "Point2D"
>;
export const Point2D = Brand.refined<Point2D>(
  ({ x, y }) => !Number.isNaN(x) && !Number.isNaN(y),
  (n) => Brand.error(`Expected ${JSON.stringify(n)} to be a 2D point`),
);

export type Point3D = Brand.Branded<
  {
    x: uom.Centi<uom.Meter>;
    y: uom.Centi<uom.Meter>;
    z: uom.Centi<uom.Meter>;
  },
  "Point3D"
>;
export const Point3D = Brand.refined<Point3D>(
  ({ x, y, z }) => !Number.isNaN(x) && !Number.isNaN(y) && !Number.isNaN(z),
  (n) => Brand.error(`Expected ${JSON.stringify(n)} to be a 3D point`),
);

export type Size2D = Brand.Branded<
  {
    x: uom.Centi<uom.Meter>;
    y: uom.Centi<uom.Meter>;
  },
  "Size2D"
>;
export const Size2D = Brand.refined<Size2D>(
  ({ x, y }) => !Number.isNaN(x) && !Number.isNaN(y),
  (n) => Brand.error(`Expected ${JSON.stringify(n)} to be a 2D size`),
);

export type Size3D = Brand.Branded<
  {
    x: uom.Centi<uom.Meter>;
    y: uom.Centi<uom.Meter>;
    z: uom.Centi<uom.Meter>;
  },
  "Size3D"
>;
export const Size3D = Brand.refined<Size3D>(
  ({ x, y, z }) => !Number.isNaN(x) && !Number.isNaN(y) && !Number.isNaN(z),
  (n) => Brand.error(`Expected ${JSON.stringify(n)} to be a 3D size`),
);

export type FoundationUnit = uom.Multiply<
  uom.Centi<uom.Meter>,
  uom.UnitConversionRate<{
    scalar800: -1;
  }>
>;

export type SizeInFoundations3D = Brand.Branded<
  {
    x: FoundationUnit;
    y: FoundationUnit;
    z: FoundationUnit;
  },
  "SizeInFoundations3D"
>;
export const SizeInFoundations3D = Brand.refined<SizeInFoundations3D>(
  ({ x, y, z }) => !Number.isNaN(x) && !Number.isNaN(y) && !Number.isNaN(z),
  (n) => Brand.error(`Expected ${JSON.stringify(n)} to be a 3D size`),
);

export const enum ItemForm {
  Invalid,
  Solid,
  Liquid,
  Gas,
}

export const enum ItemTransporter {
  Invalid,
  Belt,
  Pipe,
}

export {
  type Base,
  type Named,
  type Buildable,
  type Item,
  type Building,
  type Recipe,
  type Machine,
  type Vehicle,
  type Equipment,
  type Schematic,
} from "~/game-data/generate/upgrade/types";
