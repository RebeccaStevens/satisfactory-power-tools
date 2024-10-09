import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableSnowDispenser(
  data: unknown,
): asserts data is VendorFGBuildableSnowDispenser {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in VendorFGBuildableSnowDispenser",
  );
}

export type VendorFGBuildableSnowDispenser = VendorFGBuildable & {};
