import { assert } from "chai";

import {
  type VendorFGItemDescriptor,
  assertVendorFGItemDescriptor,
} from "~/game-data/generate/parsers/FGItemDescriptor/assert";

export function assertVendorFGAmmoTypeSpreadshot(data: unknown): asserts data is VendorFGAmmoTypeSpreadshot {
  assertVendorFGItemDescriptor(data);

  assert.isEmpty(
    ["SpreadTrail_Velocity", "mNumShots", "mSpreadAngleDegrees"].filter(
      (field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGAmmoTypeSpreadshot",
  );
}

export type VendorFGAmmoTypeSpreadshot = VendorFGItemDescriptor & {
  SpreadTrail_Velocity: string;
  mNumShots: string;
  mSpreadAngleDegrees: string;
};
