import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableBlueprintDesigner(
  data: unknown,
): asserts data is VendorFGBuildableBlueprintDesigner {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [
      "mTerminalDistanceFromEdge",
      "mTerminalHalfDepth",
      "mDimensions",
      "OnRecordDataChanged",
      "OnBlueprintCostChanged",
      "mCurrentCost",
      "mBuildables",
      "mCurrentRecordData",
      "mIsDismantlingAll",
    ].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGBuildableAttachmentMerger",
  );
}

export type VendorFGBuildableBlueprintDesigner = VendorFGBuildable & {
  mTerminalDistanceFromEdge: string;
  mTerminalHalfDepth: string;
  mDimensions: string;
  OnRecordDataChanged: string;
  OnBlueprintCostChanged: string;
  mCurrentCost: string;
  mBuildables: string;
  mCurrentRecordData: string;
  mIsDismantlingAll: string;
};
