import { assert } from "chai";

import {
  type VendorAbstractEquipment,
  assertVendorAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment/assert";

export function assertVendorFGJumpingStilts(
  data: unknown,
): asserts data is VendorFGJumpingStilts {
  assertVendorAbstractEquipment(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGJumpingStilts",
  );
}

export type VendorFGJumpingStilts = VendorAbstractEquipment & {};
