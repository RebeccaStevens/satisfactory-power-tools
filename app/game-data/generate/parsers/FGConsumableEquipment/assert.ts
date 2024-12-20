import { assert } from "chai";

import {
  type VendorFGEquipment,
  assertVendorFGEquipment,
} from "~/game-data/generate/parsers/abstract/FGEquipment/assert";

export function assertVendorFGConsumableEquipment(data: unknown): asserts data is VendorFGConsumableEquipment {
  assertVendorFGEquipment(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in FGConsumableEquipment",
  );
}

export type VendorFGConsumableEquipment = VendorFGEquipment & {};
