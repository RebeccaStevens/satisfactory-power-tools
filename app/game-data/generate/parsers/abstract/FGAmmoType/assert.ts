import { assert } from "chai";

import {
  type VendorFGItemDescriptor,
  assertVendorFGItemDescriptor,
} from "~/game-data/generate/parsers/FGItemDescriptor/assert";

export function assertVendorAbstractFGAmmoType(data: unknown): asserts data is VendorAbstractFGAmmoType {
  assertVendorFGItemDescriptor(data);

  assert.isEmpty(
    [
      "AmmoFiredDelegate",
      "mFiringTransform",
      "mFiringDirection",
      "mMagazineSize",
      "mMaxAmmoEffectiveRange",
      "mReloadTimeMultiplier",
      "mFireRate",
      "mFiringTransformIgnoresDispersion",
      "mDispersionFireRateMultiplier",
      "mDispersionPerShot",
      "mRestingDispersion",
      "mFiringDispersion",
      "mDispersionRecoveryTime",
      "mHasBeenInitialized",
      "mWeaponDamageMultiplier",
      "mMagazineMeshMaterials",
      "mMagazineMeshMaterials1p",
      "mDamageTypesOnImpact",
      "mAmmoDamageFalloff",
      "mMuzzleFlashScale",
      "mFiringSounds",
      "mFiringSounds1P",
      "mAmmoColor",
      "mAmmoScale",
      "mAmmoTickFunction",
    ].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in AbstractFGAmmo",
  );
}

export type VendorAbstractFGAmmoType = VendorFGItemDescriptor & {
  AmmoFiredDelegate: string;
  mFiringTransform: string;
  mFiringDirection: string;
  mMagazineSize: string;
  mMaxAmmoEffectiveRange: string;
  mReloadTimeMultiplier: string;
  mFireRate: string;
  mFiringTransformIgnoresDispersion: string;
  mDispersionFireRateMultiplier: string;
  mDispersionPerShot: string;
  mRestingDispersion: string;
  mFiringDispersion: string;
  mDispersionRecoveryTime: string;
  mHasBeenInitialized: string;
  mWeaponDamageMultiplier: string;
  mMagazineMeshMaterials: string;
  mMagazineMeshMaterials1p: string;
  mDamageTypesOnImpact: string;
  mAmmoDamageFalloff: string;
  mMuzzleFlashScale: string;
  mFiringSounds: string;
  mFiringSounds1P: string;
  mAmmoColor: string;
  mAmmoScale: string;
  mAmmoTickFunction: string;
};
