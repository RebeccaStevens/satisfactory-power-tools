import { assert } from "chai";

import { type VendorFGBuildable, assertVendorFGBuildable } from "~/game-data/generate/parsers/FGBuildable/assert";

export function assertVendorFGBuildableSplitterSmart(data: unknown): asserts data is VendorFGBuildableSplitterSmart {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in VendorFGBuildableSplitterSmart",
  );
}

export type VendorFGBuildableSplitterSmart = VendorFGBuildable & {};
