import type { Item } from "~/data/core/parsers";
import type { Color, Point3D, Transform3D } from "~/data/core/types";

export type Data = Item & {
  mFiringTransform: Transform3D;
  mFiringDirection: Point3D;
  mMagazineSize: number;
  mMaxAmmoEffectiveRange: number;
  mReloadTimeMultiplier: number;
  mFireRate: number;
  mFiringTransformIgnoresDispersion: boolean;
  mDispersionFireRateMultiplier: number;
  mDispersionPerShot: number;
  mRestingDispersion: number;
  mFiringDispersion: number;
  mDispersionRecoveryTime: number;
  mHasBeenInitialized: boolean;
  mWeaponDamageMultiplier: number;
  mMuzzleFlashScale: Point3D;
  mAmmoColor: Color;
  mAmmoScale: number;
};
