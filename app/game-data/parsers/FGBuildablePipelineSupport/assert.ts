import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildablePipelineSupport(
  data: unknown,
): asserts data is VendorFGBuildablePipelineSupport {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in VendorFGBuildablePipelineSupport",
  );
}

export type VendorFGBuildablePipelineSupport = VendorFGBuildable & {};
