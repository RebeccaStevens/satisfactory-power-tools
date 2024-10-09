import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableRailroadSignal(
  data: unknown,
): asserts data is VendorFGBuildableRailroadSignal {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in VendorFGBuildableRailroadSignal",
  );
}

export type VendorFGBuildableRailroadSignal = VendorFGBuildable & {};
