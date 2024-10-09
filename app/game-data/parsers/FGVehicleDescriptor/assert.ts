import { assert } from "chai";

import {
  type VendorAbstractBase,
  assertVendorAbstractBase,
} from "~/game-data/parsers/abstractBase/assert";

export function assertVendorFGVehicleDescriptor(
  data: unknown,
): asserts data is VendorFGVehicleDescriptor {
  assertVendorAbstractBase(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGVehicleDescriptor",
  );
}

export type VendorFGVehicleDescriptor = VendorAbstractBase & {};
