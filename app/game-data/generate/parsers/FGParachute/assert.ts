import { assert } from "chai";

import {
  type VendorFGEquipment,
  assertVendorFGEquipment,
} from "~/game-data/generate/parsers/abstract/FGEquipment/assert";

export function assertVendorFGParachute(data: unknown): asserts data is VendorFGParachute {
  assertVendorFGEquipment(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in FGParachute",
  );
}

export type VendorFGParachute = VendorFGEquipment & {};
