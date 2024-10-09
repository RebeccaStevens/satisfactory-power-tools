import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildablePipeReservoir(
  data: unknown,
): asserts data is VendorFGBuildablePipeReservoir {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in VendorFGBuildablePipeReservoir",
  );
}

export type VendorFGBuildablePipeReservoir = VendorFGBuildable & {};
