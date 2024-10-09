import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableCornerWallLightweight(
  data: unknown,
): asserts data is VendorFGBuildableCornerWallLightweight {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    ["mSize", "mHeight"].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGBuildableCornerWallLightweight",
  );
}

export type VendorFGBuildableCornerWallLightweight = VendorFGBuildable & {
  mSize: string;
  mHeight: string;
};
