import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableWalkway(
  data: unknown,
): asserts data is VendorFGBuildableWalkway {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in VendorFGBuildableWalkway",
  );
}

export type VendorFGBuildableWalkway = VendorFGBuildable & {};
