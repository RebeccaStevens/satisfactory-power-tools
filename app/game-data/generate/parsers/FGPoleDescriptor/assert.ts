import { assert } from "chai";

import {
  type VendorFGBuildingDescriptor,
  assertVendorFGBuildingDescriptor,
} from "~/game-data/generate/parsers/FGBuildingDescriptor/assert";

export function assertVendorFGPoleDescriptor(data: unknown): asserts data is VendorFGPoleDescriptor {
  assertVendorFGBuildingDescriptor(data);

  assert.isEmpty(
    [].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in FGPoleDescriptor",
  );
}

export type VendorFGPoleDescriptor = VendorFGBuildingDescriptor & {};
