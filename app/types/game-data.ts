import { Brand } from "effect";

import type { Int } from "~/types/common";

export type Id = Brand.Branded<string, "Id">;
export const Id = Brand.refined<Id>(
  (n) => typeof n === "string" && n.length > 0,
  (n) => Brand.error(`Expected ${n} to be a nonempty string`),
);

export type ResourceSinkPoints = Brand.Branded<number, "ResourceSinkPoints">;
export const ResourceSinkPoints = Brand.refined<ResourceSinkPoints>(
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
