import { assert } from "chai";

import { type VendorFGBuildable, assertVendorFGBuildable } from "~/game-data/generate/parsers/FGBuildable/assert";

export function assertVendorFGBuildableFoundationLightweight(
  data: unknown,
): asserts data is VendorFGBuildableFoundationLightweight {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in VendorFGBuildableFoundationLightweight",
  );
}

export type VendorFGBuildableFoundationLightweight = VendorFGBuildable & {};
