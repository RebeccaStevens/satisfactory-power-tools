import assert from "node:assert/strict";

import { parseItem } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseBoolean,
  parsePoint3D,
  parseTransform3D,
  parseColor,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const item = parseItem(data);

  assert("mFiringTransform" in data);
  assert("mFiringDirection" in data);
  assert("mMagazineSize" in data);
  assert("mMaxAmmoEffectiveRange" in data);
  assert("mReloadTimeMultiplier" in data);
  assert("mFireRate" in data);
  assert("mFiringTransformIgnoresDispersion" in data);
  assert("mDispersionFireRateMultiplier" in data);
  assert("mDispersionPerShot" in data);
  assert("mRestingDispersion" in data);
  assert("mFiringDispersion" in data);
  assert("mDispersionRecoveryTime" in data);
  assert("mHasBeenInitialized" in data);
  assert("mWeaponDamageMultiplier" in data);
  assert("mMuzzleFlashScale" in data);
  assert("mAmmoColor" in data);
  assert("mAmmoScale" in data);

  return {
    ...item,
    mFiringTransform: parseTransform3D(data.mFiringTransform),
    mFiringDirection: parsePoint3D(data.mFiringDirection),
    mMagazineSize: parseNumber(data.mMagazineSize),
    mMaxAmmoEffectiveRange: parseNumber(data.mMaxAmmoEffectiveRange),
    mReloadTimeMultiplier: parseNumber(data.mReloadTimeMultiplier),
    mFireRate: parseNumber(data.mFireRate),
    mFiringTransformIgnoresDispersion: parseBoolean(
      data.mFiringTransformIgnoresDispersion,
    ),
    mDispersionFireRateMultiplier: parseNumber(
      data.mDispersionFireRateMultiplier,
    ),
    mDispersionPerShot: parseNumber(data.mDispersionPerShot),
    mRestingDispersion: parseNumber(data.mRestingDispersion),
    mFiringDispersion: parseNumber(data.mFiringDispersion),
    mDispersionRecoveryTime: parseNumber(data.mDispersionRecoveryTime),
    mHasBeenInitialized: parseBoolean(data.mHasBeenInitialized),
    mWeaponDamageMultiplier: parseNumber(data.mWeaponDamageMultiplier),
    mMuzzleFlashScale: parsePoint3D(data.mMuzzleFlashScale),
    mAmmoColor: parseColor(data.mAmmoColor),
    mAmmoScale: parseNumber(data.mAmmoScale),
  };
}
