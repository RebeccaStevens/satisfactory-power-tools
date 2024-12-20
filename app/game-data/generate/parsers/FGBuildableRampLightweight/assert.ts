import { assert } from "chai";

import { type VendorFGBuildable, assertVendorFGBuildable } from "~/game-data/generate/parsers/FGBuildable/assert";

export function assertVendorFGBuildableRampLightweight(
  data: unknown,
): asserts data is VendorFGBuildableRampLightweight {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in VendorFGBuildableRampLightweight",
  );
}

export type VendorFGBuildableRampLightweight = VendorFGBuildable & {};
