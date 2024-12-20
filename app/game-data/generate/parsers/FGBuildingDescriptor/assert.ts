import { assert } from "chai";

import { type VendorFGNamed, assertVendorFGNamed } from "~/game-data/generate/parsers/abstract/FGNamed/assert";

export function assertVendorFGBuildingDescriptor(data: unknown): asserts data is VendorFGBuildingDescriptor {
  assertVendorFGNamed(data);

  assert.isEmpty(
    [
      "mDescription",
      "mAbbreviatedDisplayName",
      "mStackSize",
      "mCanBeDiscarded",
      "mRememberPickUp",
      "mEnergyValue",
      "mRadioactiveDecay",
      "mForm",
      "mGasType",
      "mSmallIcon",
      "mPersistentBigIcon",
      "mCrosshairMaterial",
      "mDescriptorStatBars",
      "mIsAlienItem",
      "mSubCategories",
      "mMenuPriority",
      "mFluidColor",
      "mGasColor",
      "mCompatibleItemDescriptors",
      "mClassToScanFor",
      "mScannableType",
      "mShouldOverrideScannerDisplayText",
      "mScannerDisplayText",
      "mScannerLightColor",
      "mNeedsPickUpMarker",
    ].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in FGBuildingDescriptor",
  );
}

export type VendorFGBuildingDescriptor = VendorFGNamed & {
  mDescription: string;
  mAbbreviatedDisplayName: string;
  mStackSize: string;
  mCanBeDiscarded: string;
  mRememberPickUp: string;
  mEnergyValue: string;
  mRadioactiveDecay: string;
  mForm: string;
  mGasType: string;
  mSmallIcon: string;
  mPersistentBigIcon: string;
  mCrosshairMaterial: string;
  mDescriptorStatBars: string;
  mIsAlienItem: string;
  mSubCategories: string;
  mMenuPriority: string;
  mFluidColor: string;
  mGasColor: string;
  mCompatibleItemDescriptors: string;
  mClassToScanFor: string;
  mScannableType: string;
  mShouldOverrideScannerDisplayText: string;
  mScannerDisplayText: string;
  mScannerLightColor: string;
  mNeedsPickUpMarker: string;
};
