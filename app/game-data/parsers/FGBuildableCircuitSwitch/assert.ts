import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableCircuitSwitch(
  data: unknown,
): asserts data is VendorFGBuildableCircuitSwitch {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [
      "mTextRenderers",
      "bIsSignificant",
      "mMaxCharacters",
      "mOnIsSwitchOnChanged",
      "mOnIsConnectedChanged",
      "mOnBuildingTagChanged",
      "mIsSwitchOn",
      "mHasBuildingTag",
      "mBuildingTag",
      "mOnCircuitsChanged",
      "mIsBridgeConnected",
      "mConnections",
    ].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGBuildableCircuitSwitch",
  );
}

export type VendorFGBuildableCircuitSwitch = VendorFGBuildable & {
  mTextRenderers: string;
  bIsSignificant: string;
  mMaxCharacters: string;
  mOnIsSwitchOnChanged: string;
  mOnIsConnectedChanged: string;
  mOnBuildingTagChanged: string;
  mIsSwitchOn: string;
  mHasBuildingTag: string;
  mBuildingTag: string;
  mOnCircuitsChanged: string;
  mIsBridgeConnected: string;
  mConnections: string;
};
