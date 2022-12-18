import type { ConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import type { WeaponState } from "~/scripts/parse-raw-game-data/types";

export type Data = ConsumableEquipment & {
  mWeaponState: WeaponState;
  mAutomaticallyReload: boolean;
  mAutoReloadDelay: number;
  mCurrentAmmoCount: number;
  mAllowedAmmoClasses: string[];
  mAttachMagazineToPlayer: boolean;
  mDispersionOnNoMagazine: number;
  mWeaponDamageMultiplier: number;
  mFiringBlocksDispersionReduction: boolean;
  mCurrentDispersion: number;
  mReloadTime: number;
  mAmmoSwitchUsedRadialMenu: boolean;
  mBlockSprintWhenFiring: boolean;
};
