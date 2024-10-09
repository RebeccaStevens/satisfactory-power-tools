import { assert } from "chai";

import {
  type VendorAbstractEquipment,
  assertVendorAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment/assert";

export function assertVendorFGPortableMinerDispenser(
  data: unknown,
): asserts data is VendorFGPortableMinerDispenser {
  assertVendorAbstractEquipment(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGPortableMinerDispenser",
  );
}

export type VendorFGPortableMinerDispenser = VendorAbstractEquipment & {};
