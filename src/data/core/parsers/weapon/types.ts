import type { ConsumableEquipment } from "~/data/core/parsers";
import type { WeaponState } from "~/data/core/types";

export type Data = ConsumableEquipment & {
  mWeaponState: WeaponState;
  mAutomaticallyReload: boolean;
  mAutoReloadDelay: number;
  mCurrentAmmoCount: number;
  mAllowedAmmoClasses: Set<string>;
  mAttachMagazineToPlayer: boolean;
  mDispersionOnNoMagazine: number;
  mWeaponDamageMultiplier: number;
  mFiringBlocksDispersionReduction: boolean;
  mCurrentDispersion: number;
  mReloadTime: number;
  mAmmoSwitchUsedRadialMenu: boolean;
  mBlockSprintWhenFiring: boolean;
};
