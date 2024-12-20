import { assert } from "chai";

import { type VendorFGBuildable, assertVendorFGBuildable } from "~/game-data/generate/parsers/FGBuildable/assert";

export function assertVendorFGBuildablePowerPole(data: unknown): asserts data is VendorFGBuildablePowerPole {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in VendorFGBuildablePowerPole",
  );
}

export type VendorFGBuildablePowerPole = VendorFGBuildable & {};
