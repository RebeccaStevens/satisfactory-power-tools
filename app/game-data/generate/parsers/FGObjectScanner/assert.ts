import { assert } from "chai";

import {
  type VendorFGEquipment,
  assertVendorFGEquipment,
} from "~/game-data/generate/parsers/abstract/FGEquipment/assert";

export function assertVendorFGObjectScanner(data: unknown): asserts data is VendorFGObjectScanner {
  assertVendorFGEquipment(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in FGObjectScanner",
  );
}

export type VendorFGObjectScanner = VendorFGEquipment & {};
