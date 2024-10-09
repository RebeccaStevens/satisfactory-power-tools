import { assert } from "chai";

import {
  type VendorAbstractFGAmmoType,
  assertVendorAbstractFGAmmoType,
} from "~/game-data/parsers/abstractFGAmmoType/assert";

export function assertVendorFGAmmoTypeInstantHit(
  data: unknown,
): asserts data is VendorFGAmmoTypeInstantHit {
  assertVendorAbstractFGAmmoType(data);

  assert.isEmpty(
    ["mPlayFireEffects"].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGAmmoTypeInstantHit",
  );
}

export type VendorFGAmmoTypeInstantHit = VendorAbstractFGAmmoType & {
  Location?: string;
  Trail_Velocity?: string;
  mPlayFireEffects: string;
};
