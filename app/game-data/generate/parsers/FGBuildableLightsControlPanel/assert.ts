import { assert } from "chai";

import { type VendorFGBuildable, assertVendorFGBuildable } from "~/game-data/generate/parsers/FGBuildable/assert";

export function assertVendorFGBuildableLightsControlPanel(
  data: unknown,
): asserts data is VendorFGBuildableLightsControlPanel {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in VendorFGBuildableLightsControlPanel",
  );
}

export type VendorFGBuildableLightsControlPanel = VendorFGBuildable & {};
