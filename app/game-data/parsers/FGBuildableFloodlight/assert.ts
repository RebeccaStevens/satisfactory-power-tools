import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableFloodlight(
  data: unknown,
): asserts data is VendorFGBuildableFloodlight {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in VendorFGBuildableFloodlight",
  );
}

export type VendorFGBuildableFloodlight = VendorFGBuildable & {};
