import assert from "node:assert/strict";

import { parseBase } from "~/scripts/parse-raw-game-data/parsers";
import {
  parseString,
  parseStackSize,
  parseBoolean,
  parseNumber,
  parseResourceForm,
  parseColor,
  parseNullableString,
  parseScannableType,
  parseSubCategories,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const base = parseBase(data);

  assert(Object.hasOwn(data, "mDisplayName"));
  assert(Object.hasOwn(data, "mDescription"));
  assert(Object.hasOwn(data, "mAbbreviatedDisplayName"));
  assert(Object.hasOwn(data, "mStackSize"));
  assert(Object.hasOwn(data, "mCanBeDiscarded"));
  assert(Object.hasOwn(data, "mRememberPickUp"));
  assert(Object.hasOwn(data, "mEnergyValue"));
  assert(Object.hasOwn(data, "mRadioactiveDecay"));
  assert(Object.hasOwn(data, "mForm"));
  assert(Object.hasOwn(data, "mSmallIcon"));
  assert(Object.hasOwn(data, "mPersistentBigIcon"));
  assert(Object.hasOwn(data, "mCrosshairMaterial"));
  assert(Object.hasOwn(data, "mDescriptorStatBars"));
  assert(Object.hasOwn(data, "mSubCategories"));
  assert(Object.hasOwn(data, "mMenuPriority"));
  assert(Object.hasOwn(data, "mFluidColor"));
  assert(Object.hasOwn(data, "mGasColor"));
  assert(Object.hasOwn(data, "mCompatibleItemDescriptors"));
  assert(Object.hasOwn(data, "mClassToScanFor"));
  assert(Object.hasOwn(data, "mScannableType"));
  assert(Object.hasOwn(data, "mShouldOverrideScannerDisplayText"));
  assert(Object.hasOwn(data, "mScannerDisplayText"));
  assert(Object.hasOwn(data, "mScannerLightColor"));

  return {
    ...base,
    mDescription: parseString(data.mDescription),
    mAbbreviatedDisplayName: parseString(data.mAbbreviatedDisplayName),
    mStackSize: parseStackSize(data.mStackSize),
    mCanBeDiscarded: parseBoolean(data.mCanBeDiscarded),
    mRememberPickUp: parseBoolean(data.mRememberPickUp),
    mEnergyValue: parseNumber(data.mEnergyValue),
    mRadioactiveDecay: parseNumber(data.mRadioactiveDecay),
    mForm: parseResourceForm(data.mForm),
    mSmallIcon: parseString(data.mSmallIcon),
    mPersistentBigIcon: parseString(data.mPersistentBigIcon),
    mCrosshairMaterial: parseNullableString(data.mCrosshairMaterial),
    mDescriptorStatBars: parseString(data.mDescriptorStatBars),
    mSubCategories: parseSubCategories(data.mSubCategories),
    mMenuPriority: parseNumber(data.mMenuPriority),
    mFluidColor: parseColor(data.mFluidColor),
    mGasColor: parseColor(data.mGasColor),
    mCompatibleItemDescriptors: parseString(data.mCompatibleItemDescriptors),
    mClassToScanFor: parseNullableString(data.mClassToScanFor),
    mScannableType: parseScannableType(data.mScannableType),
    mShouldOverrideScannerDisplayText: parseBoolean(
      data.mShouldOverrideScannerDisplayText,
    ),
    mScannerDisplayText: parseString(data.mScannerDisplayText),
    mScannerLightColor: parseColor(data.mScannerLightColor),
  };
}
