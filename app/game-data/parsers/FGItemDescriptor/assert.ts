import { assert } from "chai";

import {
  type VendorFGBuildingDescriptor,
  assertVendorFGBuildingDescriptor,
} from "~/game-data/parsers/FGBuildingDescriptor/assert";

export function assertVendorFGItemDescriptor(
  data: unknown,
): asserts data is VendorFGItemDescriptor {
  assertVendorFGBuildingDescriptor(data);
  assert.isEmpty(
    ["mResourceSinkPoints"].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGItemDescriptor",
  );
}

export type VendorFGItemDescriptor = VendorFGBuildingDescriptor & {
  mResourceSinkPoints: string;
};
