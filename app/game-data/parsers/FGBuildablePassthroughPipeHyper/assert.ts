import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildablePassthroughPipeHyper(
  data: unknown,
): asserts data is VendorFGBuildablePassthroughPipeHyper {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in VendorFGBuildablePassthroughPipeHyper",
  );
}

export type VendorFGBuildablePassthroughPipeHyper = VendorFGBuildable & {};
