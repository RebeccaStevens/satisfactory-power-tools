import { assert } from "chai";

import { type VendorFGBuildable, assertVendorFGBuildable } from "~/game-data/generate/parsers/FGBuildable/assert";

export function assertVendorFGBuildablePoleLightweight(
  data: unknown,
): asserts data is VendorFGBuildablePoleLightweight {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in VendorFGBuildablePoleLightweight",
  );
}

export type VendorFGBuildablePoleLightweight = VendorFGBuildable & {};
