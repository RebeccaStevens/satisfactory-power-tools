import { assert } from "chai";

import {
  type VendorAbstractEquipment,
  assertVendorAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment/assert";

export function assertVendorFGEquipmentZipline(
  data: unknown,
): asserts data is VendorFGEquipmentZipline {
  assertVendorAbstractEquipment(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGEquipmentZipline",
  );
}

export type VendorFGEquipmentZipline = VendorAbstractEquipment & {};
