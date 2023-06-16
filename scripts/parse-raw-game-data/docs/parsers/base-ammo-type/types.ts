import { type Item } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  type Color,
  type Point3D,
  type Transform3D,
} from "~/scripts/parse-raw-game-data/types";

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
