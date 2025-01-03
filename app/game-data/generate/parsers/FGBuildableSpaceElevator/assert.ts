import { assert } from "chai";

import { type VendorFGBuildable, assertVendorFGBuildable } from "~/game-data/generate/parsers/FGBuildable/assert";

export function assertVendorFGBuildableSpaceElevator(data: unknown): asserts data is VendorFGBuildableSpaceElevator {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in VendorFGBuildableSpaceElevator",
  );
}

export type VendorFGBuildableSpaceElevator = VendorFGBuildable & {};
