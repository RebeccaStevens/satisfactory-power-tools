import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseBoolean,
  parseClasses,
  parseWeaponState,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const consumableEquipment = parseConsumableEquipment(data);

  assertPropertyExists(data, "mWeaponState");
  assertPropertyExists(data, "mAutomaticallyReload");
  assertPropertyExists(data, "mAutoReloadDelay");
  assertPropertyExists(data, "mCurrentAmmoCount");
  assertPropertyExists(data, "mAllowedAmmoClasses");
  assertPropertyExists(data, "mAttachMagazineToPlayer");
  assertPropertyExists(data, "mDispersionOnNoMagazine");
  assertPropertyExists(data, "mWeaponDamageMultiplier");
  assertPropertyExists(data, "mFiringBlocksDispersionReduction");
  assertPropertyExists(data, "mCurrentDispersion");
  assertPropertyExists(data, "mReloadTime");
  assertPropertyExists(data, "mAmmoSwitchUsedRadialMenu");
  assertPropertyExists(data, "mBlockSprintWhenFiring");

  return {
    ...consumableEquipment,
    mWeaponState: parseWeaponState(data.mWeaponState),
    mAutomaticallyReload: parseBoolean(data.mAutomaticallyReload),
    mAutoReloadDelay: parseNumber(data.mAutoReloadDelay),
    mCurrentAmmoCount: parseNumber(data.mCurrentAmmoCount),
    mAllowedAmmoClasses: parseClasses(data.mAllowedAmmoClasses),
    mAttachMagazineToPlayer: parseBoolean(data.mAttachMagazineToPlayer),
    mDispersionOnNoMagazine: parseNumber(data.mDispersionOnNoMagazine),
    mWeaponDamageMultiplier: parseNumber(data.mWeaponDamageMultiplier),
    mFiringBlocksDispersionReduction: parseBoolean(
      data.mFiringBlocksDispersionReduction,
    ),
    mCurrentDispersion: parseNumber(data.mCurrentDispersion),
    mReloadTime: parseNumber(data.mReloadTime),
    mAmmoSwitchUsedRadialMenu: parseBoolean(data.mAmmoSwitchUsedRadialMenu),
    mBlockSprintWhenFiring: parseBoolean(data.mBlockSprintWhenFiring),
  };
}
