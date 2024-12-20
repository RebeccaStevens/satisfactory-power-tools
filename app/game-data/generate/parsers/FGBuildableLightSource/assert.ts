import { assert } from "chai";

import { type VendorFGBuildable, assertVendorFGBuildable } from "~/game-data/generate/parsers/FGBuildable/assert";

export function assertVendorFGBuildableLightSource(data: unknown): asserts data is VendorFGBuildableLightSource {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in VendorFGBuildableLightSource",
  );
}

export type VendorFGBuildableLightSource = VendorFGBuildable & {};
