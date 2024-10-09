import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableCornerWall(
  data: unknown,
): asserts data is VendorFGBuildableCornerWall {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    ["mSize", "mHeight"].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGBuildableCornerWall",
  );
}

export type VendorFGBuildableCornerWall = VendorFGBuildable & {
  mSize: string;
  mHeight: string;
};
