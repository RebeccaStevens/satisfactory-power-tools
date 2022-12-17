import type { ConsumableEquipment } from "~/scripts/parse-raw-game-data/parsers";
import type { WeaponState } from "~/scripts/parse-raw-game-data/types";

export type Data = ConsumableEquipment & {
  mWeaponState: WeaponState;
  mAutomaticallyReload: boolean;
  mAutoReloadDelay: number;
  mCurrentAmmoCount: number;
  mAllowedAmmoClasses: Array<string>;
  mAttachMagazineToPlayer: boolean;
  mDispersionOnNoMagazine: number;
  mWeaponDamageMultiplier: number;
  mFiringBlocksDispersionReduction: boolean;
  mCurrentDispersion: number;
  mReloadTime: number;
  mAmmoSwitchUsedRadialMenu: boolean;
  mBlockSprintWhenFiring: boolean;
};
