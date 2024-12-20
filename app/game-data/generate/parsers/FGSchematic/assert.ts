import { assert } from "chai";

import { type VendorFGBase, assertVendorFGBase } from "~/game-data/generate/parsers/abstract/FGBase/assert";

export function assertVendorFGSchematic(data: unknown): asserts data is VendorFGSchematic {
  assertVendorFGBase(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in FGSchematic",
  );
}

export type VendorFGSchematic = VendorFGBase & {};
