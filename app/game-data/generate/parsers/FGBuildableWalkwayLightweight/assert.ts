import { assert } from "chai";

import { type VendorFGBuildable, assertVendorFGBuildable } from "~/game-data/generate/parsers/FGBuildable/assert";

export function assertVendorFGBuildableWalkwayLightweight(
  data: unknown,
): asserts data is VendorFGBuildableWalkwayLightweight {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in VendorFGBuildableWalkwayLightweight",
  );
}

export type VendorFGBuildableWalkwayLightweight = VendorFGBuildable & {};
