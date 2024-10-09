import { assert } from "chai";

import {
  type VendorAbstractEquipment,
  assertVendorAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment/assert";

export function assertVendorFGHoverPack(
  data: unknown,
): asserts data is VendorFGHoverPack {
  assertVendorAbstractEquipment(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGHoverPack",
  );
}

export type VendorFGHoverPack = VendorAbstractEquipment & {};
