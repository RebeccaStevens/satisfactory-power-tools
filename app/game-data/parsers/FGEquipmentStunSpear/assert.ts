import { assert } from "chai";

import {
  type VendorAbstractEquipment,
  assertVendorAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment/assert";

export function assertVendorFGEquipmentStunSpear(
  data: unknown,
): asserts data is VendorFGEquipmentStunSpear {
  assertVendorAbstractEquipment(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGEquipmentStunSpear",
  );
}

export type VendorFGEquipmentStunSpear = VendorAbstractEquipment & {};
