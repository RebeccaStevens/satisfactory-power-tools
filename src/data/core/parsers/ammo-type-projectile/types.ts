import type { BaseAmmoType } from "~/data/core/parsers";

export type Data = BaseAmmoType & {
  mInitialProjectileSpeedOverride: number;
  mProjectileMaxSpeedOverride: number;
  mProjectileHealthOverride: number;
  mProjectileLifespan: number;
  mProjectileStickspan: number;
  mCanTakeDamageBySameProjectileOrChild: boolean;
  mHomingProjectile: boolean;
  mHomingNeedsValidTarget: boolean;
  mMaxHomingAccelerationMagnitudeOverride: number;
  mHomingOverlapSize: number;
  mHomingAngleLimit: number;
};
