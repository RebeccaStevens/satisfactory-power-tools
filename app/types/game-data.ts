import { Brand } from "effect";
import type * as uom from "effect-uom";

import type { Int } from "~/types/common";

export type Id = Brand.Branded<string, "Id">;
export const Id = Brand.refined<Id>(
  (n) => typeof n === "string" && n.length > 0,
  (n) => Brand.error(`Expected ${n} to be a nonempty string`),
);

export type ClassName = Brand.Branded<string, "ClassName">;
export const ClassName = Brand.refined<ClassName>(
  (n) => typeof n === "string" && n.length > 0,
  (n) => Brand.error(`Expected ${n} to be a nonempty string`),
);

export type ResourceSinkPoint = Brand.Branded<number, "ResourceSinkPoints">;
export const ResourceSinkPoint = Brand.refined<ResourceSinkPoint>(
  (n) => typeof n === "number" && n >= 0 && Number.isInteger(n),
  (n) => Brand.error(`Expected ${n} to be a number >= 0`),
);

export type MenuPriority = Brand.Branded<number, "MenuPriority">;
export const MenuPriority = Brand.refined<MenuPriority>(
  (n) => typeof n === "number" && !Number.isNaN(n),
  (n) => Brand.error(`Expected ${n} to be a number`),
);

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
    !Number.isNaN(red) &&
    !Number.isNaN(green) &&
    !Number.isNaN(blue) &&
    !Number.isNaN(alpha),
  (n) =>
    Brand.error(
      `Expected ${JSON.stringify(n)} to be a color with red, green, blue and alpha channels`,
    ),
);

export type Point2D = Brand.Branded<
  {
    x: uom.Meter;
    y: uom.Meter;
  },
  "Point2D"
>;
export const Point2D = Brand.refined<Point2D>(
  ({ x, y }) => !Number.isNaN(x) && !Number.isNaN(y),
  (n) => Brand.error(`Expected ${JSON.stringify(n)} to be a 2D point`),
);

export type Point3D = Brand.Branded<
  {
    x: uom.Meter;
    y: uom.Meter;
    z: uom.Meter;
  },
  "Point3D"
>;
export const Point3D = Brand.refined<Point3D>(
  ({ x, y, z }) => !Number.isNaN(x) && !Number.isNaN(y) && !Number.isNaN(z),
  (n) => Brand.error(`Expected ${JSON.stringify(n)} to be a 3D point`),
);

export type Size2D = Brand.Branded<
  {
    x: uom.Meter;
    y: uom.Meter;
  },
  "Size2D"
>;
export const Size2D = Brand.refined<Size2D>(
  ({ x, y }) => !Number.isNaN(x) && !Number.isNaN(y),
  (n) => Brand.error(`Expected ${JSON.stringify(n)} to be a 2D size`),
);

export type Size3D = Brand.Branded<
  {
    x: uom.Meter;
    y: uom.Meter;
    z: uom.Meter;
  },
  "Size3D"
>;
export const Size3D = Brand.refined<Size3D>(
  ({ x, y, z }) => !Number.isNaN(x) && !Number.isNaN(y) && !Number.isNaN(z),
  (n) => Brand.error(`Expected ${JSON.stringify(n)} to be a 3D size`),
);

export type SizeInFoundations3D = Brand.Branded<
  {
    x: number;
    y: number;
    z: number;
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
