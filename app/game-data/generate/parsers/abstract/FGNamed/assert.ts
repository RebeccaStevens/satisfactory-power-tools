import { assert } from "chai";

import { type VendorFGBase, assertVendorFGBase } from "~/game-data/generate/parsers/abstract/FGBase/assert";

export function assertVendorFGNamed(data: unknown): asserts data is VendorFGNamed {
  assertVendorFGBase(data);
  assert.isEmpty(
    ["mDisplayName"].filter(
      (field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGNamed",
  );
}

export type VendorFGNamed = VendorFGBase & {
  mDisplayName: string;
};
