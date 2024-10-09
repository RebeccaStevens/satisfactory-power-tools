import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGConveyorPoleStackable(
  data: unknown,
): asserts data is VendorFGConveyorPoleStackable {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGConveyorPoleStackable",
  );
}

export type VendorFGConveyorPoleStackable = VendorFGBuildable & {};
