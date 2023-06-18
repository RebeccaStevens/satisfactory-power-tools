import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
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

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const base = parseBase(data);

  assertPropertyExists(data, "mDisplayName");
  assertPropertyExists(data, "mDescription");
  assertPropertyExists(data, "mAbbreviatedDisplayName");
  assertPropertyExists(data, "mStackSize");
  assertPropertyExists(data, "mCanBeDiscarded");
  assertPropertyExists(data, "mRememberPickUp");
  assertPropertyExists(data, "mEnergyValue");
  assertPropertyExists(data, "mRadioactiveDecay");
  assertPropertyExists(data, "mForm");
  assertPropertyExists(data, "mSmallIcon");
  assertPropertyExists(data, "mPersistentBigIcon");
  assertPropertyExists(data, "mCrosshairMaterial");
  assertPropertyExists(data, "mDescriptorStatBars");
  assertPropertyExists(data, "mSubCategories");
  assertPropertyExists(data, "mMenuPriority");
  assertPropertyExists(data, "mFluidColor");
  assertPropertyExists(data, "mGasColor");
  assertPropertyExists(data, "mCompatibleItemDescriptors");
  assertPropertyExists(data, "mClassToScanFor");
  assertPropertyExists(data, "mScannableType");
  assertPropertyExists(data, "mShouldOverrideScannerDisplayText");
  assertPropertyExists(data, "mScannerDisplayText");
  assertPropertyExists(data, "mScannerLightColor");

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
