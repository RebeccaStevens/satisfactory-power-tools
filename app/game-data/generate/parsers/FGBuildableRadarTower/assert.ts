import { assert } from "chai";

import { type VendorFGBuildable, assertVendorFGBuildable } from "~/game-data/generate/parsers/FGBuildable/assert";

export function assertVendorFGBuildableRadarTower(data: unknown): asserts data is VendorFGBuildableRadarTower {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in VendorFGBuildableRadarTower",
  );
}

export type VendorFGBuildableRadarTower = VendorFGBuildable & {};
