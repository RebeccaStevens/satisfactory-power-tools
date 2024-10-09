import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableTradingPost(
  data: unknown,
): asserts data is VendorFGBuildableTradingPost {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in VendorFGBuildableTradingPost",
  );
}

export type VendorFGBuildableTradingPost = VendorFGBuildable & {};
