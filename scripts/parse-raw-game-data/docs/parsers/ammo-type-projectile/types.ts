import type { BaseAmmoType } from "~/scripts/parse-raw-game-data/docs/parsers";

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
