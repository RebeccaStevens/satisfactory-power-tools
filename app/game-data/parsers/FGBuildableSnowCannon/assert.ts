import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableSnowCannon(
  data: unknown,
): asserts data is VendorFGBuildableSnowCannon {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in VendorFGBuildableSnowCannon",
  );
}

export type VendorFGBuildableSnowCannon = VendorFGBuildable & {};
