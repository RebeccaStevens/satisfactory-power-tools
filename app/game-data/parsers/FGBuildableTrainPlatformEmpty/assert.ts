import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableTrainPlatformEmpty(
  data: unknown,
): asserts data is VendorFGBuildableTrainPlatformEmpty {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in VendorFGBuildableTrainPlatformEmpty",
  );
}

export type VendorFGBuildableTrainPlatformEmpty = VendorFGBuildable & {};
