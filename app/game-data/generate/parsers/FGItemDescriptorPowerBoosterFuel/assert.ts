import { assert } from "chai";

import {
  type VendorFGItemDescriptor,
  assertVendorFGItemDescriptor,
} from "~/game-data/generate/parsers/FGItemDescriptor/assert";

export function assertVendorFGItemDescriptorPowerBoosterFuel(
  data: unknown,
): asserts data is VendorFGItemDescriptorPowerBoosterFuel {
  assertVendorFGItemDescriptor(data);

  assert.isEmpty(
    ["mBoostPercentage", "mBoostDuration"].filter(
      (field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGItemDescriptorNuclearFuel",
  );
}

export type VendorFGItemDescriptorPowerBoosterFuel = VendorFGItemDescriptor & {
  mBoostPercentage: string;
  mBoostDuration: string;
};
