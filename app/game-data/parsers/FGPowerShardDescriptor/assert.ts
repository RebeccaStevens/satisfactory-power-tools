import { assert } from "chai";

import {
  type VendorFGItemDescriptor,
  assertVendorFGItemDescriptor,
} from "~/game-data/parsers/FGItemDescriptor/assert";

export function assertVendorFGPowerShardDescriptor(
  data: unknown,
): asserts data is VendorFGPowerShardDescriptor {
  assertVendorFGItemDescriptor(data);

  assert.isEmpty(
    ["mPowerShardType", "mExtraPotential", "mExtraProductionBoost"].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGPowerShardDescriptor",
  );
}

export type VendorFGPowerShardDescriptor = VendorFGItemDescriptor & {
  mPowerShardType: string;
  mExtraPotential: string;
  mExtraProductionBoost: string;
};
