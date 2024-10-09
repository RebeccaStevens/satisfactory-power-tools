import { assert } from "chai";

import {
  type VendorFGItemDescriptor,
  assertVendorFGItemDescriptor,
} from "~/game-data/parsers/FGItemDescriptor/assert";

export function assertVendorFGAmmoTypeProjectile(
  data: unknown,
): asserts data is VendorFGAmmoTypeProjectile {
  assertVendorFGItemDescriptor(data);

  assert.isEmpty(
    [
      "mInitialProjectileSpeedOverride",
      "mProjectileMaxSpeedOverride",
      "mProjectileHealthOverride",
      "mProjectileLifespan",
      "mProjectileStickspan",
      "mCanTakeDamageBySameProjectileOrChild",
      "mDamageTypesAtEndOfLife",
      "mGravityScaleOverLifespan",
      "mHomingProjectile",
      "mHomingNeedsValidTarget",
      "mMaxHomingAccelerationMagnitudeOverride",
      "mHomingMagnitudeMultiplierOverLifespan",
      "mHomingMagnitudeMultiplierOverDistanceToTarget",
      "mHomingOverlapSize",
      "mHomingAngleLimit",
      "mHomingOverrideTargets",
    ].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGAmmoTypeProjectile",
  );
}

export type VendorFGAmmoTypeProjectile = VendorFGItemDescriptor & {
  mInitialProjectileSpeedOverride: string;
  mProjectileMaxSpeedOverride: string;
  mProjectileHealthOverride: string;
  mProjectileLifespan: string;
  mProjectileStickspan: string;
  mCanTakeDamageBySameProjectileOrChild: string;
  mDamageTypesAtEndOfLife: string;
  mGravityScaleOverLifespan: string;
  mHomingProjectile: string;
  mHomingNeedsValidTarget: string;
  mMaxHomingAccelerationMagnitudeOverride: string;
  mHomingMagnitudeMultiplierOverLifespan: string;
  mHomingMagnitudeMultiplierOverDistanceToTarget: string;
  mHomingOverlapSize: string;
  mHomingAngleLimit: string;
  mHomingOverrideTargets: string;
};
