import { assert } from "chai";

import { type VendorFGBuildable, assertVendorFGBuildable } from "~/game-data/generate/parsers/FGBuildable/assert";

export function assertVendorFGBuildableConveyorBelt(data: unknown): asserts data is VendorFGBuildableConveyorBelt {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [
      "mCustomSkins",
      "mMeshLength",
      "mItemMeshMap",
      "mSplineData",
      "mSpeed",
      "mItems",
      "mConveyorChainFlags",
      "mChainSegmentIndex",
    ].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in FGBuildableConveyorBelt",
  );
}

export type VendorFGBuildableConveyorBelt = VendorFGBuildable & {
  mCustomSkins: string;
  mMeshLength: string;
  mItemMeshMap: string;
  mSplineData: string;
  mSpeed: string;
  mItems: string;
  mConveyorChainFlags: string;
  mChainSegmentIndex: string;
};
