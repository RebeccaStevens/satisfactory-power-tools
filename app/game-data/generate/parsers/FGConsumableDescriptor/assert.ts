import { assert } from "chai";

import {
  type VendorFGItemDescriptor,
  assertVendorFGItemDescriptor,
} from "~/game-data/generate/parsers/FGItemDescriptor/assert";

export function assertVendorFGConsumableDescriptor(data: unknown): asserts data is VendorFGConsumableDescriptor {
  assertVendorFGItemDescriptor(data);

  assert.isEmpty(
    ["mCustomHandsMeshScale", "mCustomRotation", "mCustomLocation"].filter(
      (field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGConsumableDescriptor",
  );
}

export type VendorFGConsumableDescriptor = VendorFGItemDescriptor & {
  mHealthGain?: string;
  mCustomHandsMeshScale: string;
  mCustomRotation: string;
  mCustomLocation: string;
};
