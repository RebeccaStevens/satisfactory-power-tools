import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildablePortalSatellite(
  data: unknown,
): asserts data is VendorFGBuildablePortalSatellite {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in VendorFGBuildablePortalSatellite",
  );
}

export type VendorFGBuildablePortalSatellite = VendorFGBuildable & {};
