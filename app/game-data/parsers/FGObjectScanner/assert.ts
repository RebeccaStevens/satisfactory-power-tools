import { assert } from "chai";

import {
  type VendorAbstractEquipment,
  assertVendorAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment/assert";

export function assertVendorFGObjectScanner(
  data: unknown,
): asserts data is VendorFGObjectScanner {
  assertVendorAbstractEquipment(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGObjectScanner",
  );
}

export type VendorFGObjectScanner = VendorAbstractEquipment & {};
