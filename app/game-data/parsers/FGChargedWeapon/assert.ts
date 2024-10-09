import { assert } from "chai";

import {
  type VendorAbstractEquipment,
  assertVendorAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment/assert";

export function assertVendorFGChargedWeapon(
  data: unknown,
): asserts data is VendorFGChargedWeapon {
  assertVendorAbstractEquipment(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGChargedWeapon",
  );
}

export type VendorFGChargedWeapon = VendorAbstractEquipment & {};
