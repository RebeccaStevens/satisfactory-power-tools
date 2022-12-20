import assert from "node:assert/strict";

import { parseBase } from "~/scripts/parse-raw-game-data/docs/parsers";
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
  parseIcon,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const base = parseBase(data);

  assert("mDisplayName" in data);
  assert("mDescription" in data);
  assert("mAbbreviatedDisplayName" in data);
  assert("mStackSize" in data);
  assert("mCanBeDiscarded" in data);
  assert("mRememberPickUp" in data);
  assert("mEnergyValue" in data);
  assert("mRadioactiveDecay" in data);
  assert("mForm" in data);
  assert("mSmallIcon" in data);
  assert("mPersistentBigIcon" in data);
  assert("mCrosshairMaterial" in data);
  assert("mDescriptorStatBars" in data);
  assert("mSubCategories" in data);
  assert("mMenuPriority" in data);
  assert("mFluidColor" in data);
  assert("mGasColor" in data);
  assert("mCompatibleItemDescriptors" in data);
  assert("mClassToScanFor" in data);
  assert("mScannableType" in data);
  assert("mShouldOverrideScannerDisplayText" in data);
  assert("mScannerDisplayText" in data);
  assert("mScannerLightColor" in data);

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
    mSmallIcon: parseIcon(data.mSmallIcon),
    mPersistentBigIcon: parseIcon(data.mPersistentBigIcon),
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
