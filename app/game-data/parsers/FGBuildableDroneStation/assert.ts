import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableDroneStation(
  data: unknown,
): asserts data is VendorFGBuildableDroneStation {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in VendorFGBuildableDroneStation",
  );
}

export type VendorFGBuildableDroneStation = VendorFGBuildable & {};
