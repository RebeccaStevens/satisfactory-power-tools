import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseBoolean,
  parseClasses,
  parseWeaponState,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const consumableEquipment = parseConsumableEquipment(data);

  assert(Object.hasOwn(data, "mWeaponState"));
  assert(Object.hasOwn(data, "mAutomaticallyReload"));
  assert(Object.hasOwn(data, "mAutoReloadDelay"));
  assert(Object.hasOwn(data, "mCurrentAmmoCount"));
  assert(Object.hasOwn(data, "mAllowedAmmoClasses"));
  assert(Object.hasOwn(data, "mAttachMagazineToPlayer"));
  assert(Object.hasOwn(data, "mDispersionOnNoMagazine"));
  assert(Object.hasOwn(data, "mWeaponDamageMultiplier"));
  assert(Object.hasOwn(data, "mFiringBlocksDispersionReduction"));
  assert(Object.hasOwn(data, "mCurrentDispersion"));
  assert(Object.hasOwn(data, "mReloadTime"));
  assert(Object.hasOwn(data, "mAmmoSwitchUsedRadialMenu"));
  assert(Object.hasOwn(data, "mBlockSprintWhenFiring"));

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
