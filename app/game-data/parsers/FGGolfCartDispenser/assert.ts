import { assert } from "chai";

import {
  type VendorAbstractEquipment,
  assertVendorAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment/assert";

export function assertVendorFGGolfCartDispenser(
  data: unknown,
): asserts data is VendorFGGolfCartDispenser {
  assertVendorAbstractEquipment(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGGolfCartDispenser",
  );
}

export type VendorFGGolfCartDispenser = VendorAbstractEquipment & {};
