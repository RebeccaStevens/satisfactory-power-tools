import { assert } from "chai";

import { type VendorFGBuildable, assertVendorFGBuildable } from "~/game-data/generate/parsers/FGBuildable/assert";

export function assertVendorFGBuildablePipelinePump(data: unknown): asserts data is VendorFGBuildablePipelinePump {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in VendorFGBuildablePipelinePump",
  );
}

export type VendorFGBuildablePipelinePump = VendorFGBuildable & {};
