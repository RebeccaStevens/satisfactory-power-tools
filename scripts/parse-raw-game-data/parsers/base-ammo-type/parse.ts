import assert from "node:assert/strict";

import { parseItem } from "~/scripts/parse-raw-game-data/parsers";
import {
  parseNumber,
  parseBoolean,
  parsePoint3D,
  parseTransform3D,
  parseColor,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const item = parseItem(data);

  assert(Object.hasOwn(data, "mFiringTransform"));
  assert(Object.hasOwn(data, "mFiringDirection"));
  assert(Object.hasOwn(data, "mMagazineSize"));
  assert(Object.hasOwn(data, "mMaxAmmoEffectiveRange"));
  assert(Object.hasOwn(data, "mReloadTimeMultiplier"));
  assert(Object.hasOwn(data, "mFireRate"));
  assert(Object.hasOwn(data, "mFiringTransformIgnoresDispersion"));
  assert(Object.hasOwn(data, "mDispersionFireRateMultiplier"));
  assert(Object.hasOwn(data, "mDispersionPerShot"));
  assert(Object.hasOwn(data, "mRestingDispersion"));
  assert(Object.hasOwn(data, "mFiringDispersion"));
  assert(Object.hasOwn(data, "mDispersionRecoveryTime"));
  assert(Object.hasOwn(data, "mHasBeenInitialized"));
  assert(Object.hasOwn(data, "mWeaponDamageMultiplier"));
  assert(Object.hasOwn(data, "mMuzzleFlashScale"));
  assert(Object.hasOwn(data, "mAmmoColor"));
  assert(Object.hasOwn(data, "mAmmoScale"));

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
