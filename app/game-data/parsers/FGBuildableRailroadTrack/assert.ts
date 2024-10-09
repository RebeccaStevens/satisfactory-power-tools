import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableRailroadTrack(
  data: unknown,
): asserts data is VendorFGBuildableRailroadTrack {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in VendorFGBuildableRailroadTrack",
  );
}

export type VendorFGBuildableRailroadTrack = VendorFGBuildable & {};
