import { assert } from "chai";

import { type VendorFGBuildable, assertVendorFGBuildable } from "~/game-data/generate/parsers/FGBuildable/assert";

export function assertVendorFGBuildablePowerStorage(data: unknown): asserts data is VendorFGBuildablePowerStorage {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in VendorFGBuildablePowerStorage",
  );
}

export type VendorFGBuildablePowerStorage = VendorFGBuildable & {};
