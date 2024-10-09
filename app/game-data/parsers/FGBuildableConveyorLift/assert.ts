import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableConveyorLift(
  data: unknown,
): asserts data is VendorFGBuildableConveyorLift {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [
      "mMeshHeight",
      "mTopTransform",
      "mIsReversed",
      "mFlipMeshOnReverse",
      "mItemMeshMap",
      "mSnappedPassthroughs",
      "mOpposingConnectionClearance",
      "mSpeed",
      "mItems",
      "mConveyorChainFlags",
      "mChainSegmentIndex",
    ].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGBuildableConveyorLift",
  );
}

export type VendorFGBuildableConveyorLift = VendorFGBuildable & {
  mMeshHeight: string;
  mTopTransform: string;
  mIsReversed: string;
  mFlipMeshOnReverse: string;
  mItemMeshMap: string;
  mSnappedPassthroughs: string;
  mOpposingConnectionClearance: string;
  mSpeed: string;
  mItems: string;
  mConveyorChainFlags: string;
  mChainSegmentIndex: string;
};
