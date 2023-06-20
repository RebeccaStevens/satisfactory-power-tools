import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
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

  assertPropertyExists(data, "mFiringTransform");
  assertPropertyExists(data, "mFiringDirection");
  assertPropertyExists(data, "mMagazineSize");
  assertPropertyExists(data, "mMaxAmmoEffectiveRange");
  assertPropertyExists(data, "mReloadTimeMultiplier");
  assertPropertyExists(data, "mFireRate");
  assertPropertyExists(data, "mFiringTransformIgnoresDispersion");
  assertPropertyExists(data, "mDispersionFireRateMultiplier");
  assertPropertyExists(data, "mDispersionPerShot");
  assertPropertyExists(data, "mRestingDispersion");
  assertPropertyExists(data, "mFiringDispersion");
  assertPropertyExists(data, "mDispersionRecoveryTime");
  assertPropertyExists(data, "mHasBeenInitialized");
  assertPropertyExists(data, "mWeaponDamageMultiplier");
  assertPropertyExists(data, "mMuzzleFlashScale");
  assertPropertyExists(data, "mAmmoColor");
  assertPropertyExists(data, "mAmmoScale");

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
