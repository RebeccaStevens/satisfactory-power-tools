import { assert } from "chai";

import {
  type VendorFGEquipment,
  assertVendorFGEquipment,
} from "~/game-data/generate/parsers/abstract/FGEquipment/assert";

export function assertVendorFGEquipmentZipline(data: unknown): asserts data is VendorFGEquipmentZipline {
  assertVendorFGEquipment(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in FGEquipmentZipline",
  );
}

export type VendorFGEquipmentZipline = VendorFGEquipment & {};
