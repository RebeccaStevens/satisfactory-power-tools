import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableResourceSinkShop(
  data: unknown,
): asserts data is VendorFGBuildableResourceSinkShop {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in VendorFGBuildableResourceSinkShop",
  );
}

export type VendorFGBuildableResourceSinkShop = VendorFGBuildable & {};
