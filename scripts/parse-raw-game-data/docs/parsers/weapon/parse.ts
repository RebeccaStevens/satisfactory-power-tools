import assert from "node:assert/strict";

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

  assert("mWeaponState" in data);
  assert("mAutomaticallyReload" in data);
  assert("mAutoReloadDelay" in data);
  assert("mCurrentAmmoCount" in data);
  assert("mAllowedAmmoClasses" in data);
  assert("mAttachMagazineToPlayer" in data);
  assert("mDispersionOnNoMagazine" in data);
  assert("mWeaponDamageMultiplier" in data);
  assert("mFiringBlocksDispersionReduction" in data);
  assert("mCurrentDispersion" in data);
  assert("mReloadTime" in data);
  assert("mAmmoSwitchUsedRadialMenu" in data);
  assert("mBlockSprintWhenFiring" in data);

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
