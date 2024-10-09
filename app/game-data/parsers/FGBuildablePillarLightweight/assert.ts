import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildablePillarLightweight(
  data: unknown,
): asserts data is VendorFGBuildablePillarLightweight {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in VendorFGBuildablePillarLightweight",
  );
}

export type VendorFGBuildablePillarLightweight = VendorFGBuildable & {};
