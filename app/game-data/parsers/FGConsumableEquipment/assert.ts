import { assert } from "chai";

import {
  type VendorAbstractEquipment,
  assertVendorAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment/assert";

export function assertVendorFGConsumableEquipment(
  data: unknown,
): asserts data is VendorFGConsumableEquipment {
  assertVendorAbstractEquipment(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGConsumableEquipment",
  );
}

export type VendorFGConsumableEquipment = VendorAbstractEquipment & {};
