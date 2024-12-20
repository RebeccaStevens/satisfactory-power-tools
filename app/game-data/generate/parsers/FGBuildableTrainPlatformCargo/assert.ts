import { assert } from "chai";

import { type VendorFGBuildable, assertVendorFGBuildable } from "~/game-data/generate/parsers/FGBuildable/assert";

export function assertVendorFGBuildableTrainPlatformCargo(
  data: unknown,
): asserts data is VendorFGBuildableTrainPlatformCargo {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in VendorFGBuildableTrainPlatformCargo",
  );
}

export type VendorFGBuildableTrainPlatformCargo = VendorFGBuildable & {};
