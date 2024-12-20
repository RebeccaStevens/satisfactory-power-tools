import { assert } from "chai";

import { type VendorFGBase, assertVendorFGBase } from "~/game-data/generate/parsers/abstract/FGBase/assert";

export function assertVendorFGVehicleDescriptor(data: unknown): asserts data is VendorFGVehicleDescriptor {
  assertVendorFGBase(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in FGVehicleDescriptor",
  );
}

export type VendorFGVehicleDescriptor = VendorFGBase & {};
