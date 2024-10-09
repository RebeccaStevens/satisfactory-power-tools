import { assert } from "chai";

import {
  type VendorAbstractBase,
  assertVendorAbstractBase,
} from "~/game-data/parsers/abstractBase/assert";

export function assertVendorAbstractNamed(
  data: unknown,
): asserts data is VendorAbstractNamed {
  assertVendorAbstractBase(data);
  assert.isEmpty(
    ["mDisplayName"].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in AbstractNamed",
  );
}

export type VendorAbstractNamed = VendorAbstractBase & {
  mDisplayName: string;
};
