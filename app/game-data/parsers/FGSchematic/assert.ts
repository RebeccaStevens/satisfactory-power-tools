import { assert } from "chai";

import {
  type VendorAbstractBase,
  assertVendorAbstractBase,
} from "~/game-data/parsers/abstractBase/assert";

export function assertVendorFGSchematic(
  data: unknown,
): asserts data is VendorFGSchematic {
  assertVendorAbstractBase(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGSchematic",
  );
}

export type VendorFGSchematic = VendorAbstractBase & {};
