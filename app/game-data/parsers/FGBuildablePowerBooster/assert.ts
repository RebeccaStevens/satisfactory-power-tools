import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildablePowerBooster(
  data: unknown,
): asserts data is VendorFGBuildablePowerBooster {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in VendorFGBuildablePowerBooster",
  );
}

export type VendorFGBuildablePowerBooster = VendorFGBuildable & {};
