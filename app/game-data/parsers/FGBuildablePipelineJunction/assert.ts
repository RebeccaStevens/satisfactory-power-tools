import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildablePipelineJunction(
  data: unknown,
): asserts data is VendorFGBuildablePipelineJunction {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in VendorFGBuildablePipelineJunction",
  );
}

export type VendorFGBuildablePipelineJunction = VendorFGBuildable & {};
