import { assert } from "chai";

import { type VendorFGBuildable, assertVendorFGBuildable } from "~/game-data/generate/parsers/FGBuildable/assert";

export function assertVendorFGBuildablePipeHyper(data: unknown): asserts data is VendorFGBuildablePipeHyper {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in VendorFGBuildablePipeHyper",
  );
}

export type VendorFGBuildablePipeHyper = VendorFGBuildable & {};
