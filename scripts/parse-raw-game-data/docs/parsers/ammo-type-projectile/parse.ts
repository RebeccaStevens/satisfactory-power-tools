import assert from "node:assert/strict";

import { parseBaseAmmoType } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber, parseBoolean } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const ammo = parseBaseAmmoType(data);

  assert("mInitialProjectileSpeedOverride" in data);
  assert("mProjectileMaxSpeedOverride" in data);
  assert("mProjectileHealthOverride" in data);
  assert("mProjectileLifespan" in data);
  assert("mProjectileStickspan" in data);
  assert("mCanTakeDamageBySameProjectileOrChild" in data);
  assert("mHomingProjectile" in data);
  assert("mHomingNeedsValidTarget" in data);
  assert("mMaxHomingAccelerationMagnitudeOverride" in data);
  assert("mHomingOverlapSize" in data);
  assert("mHomingAngleLimit" in data);

  return {
    ...ammo,
    mInitialProjectileSpeedOverride: parseNumber(
      data.mInitialProjectileSpeedOverride,
    ),
    mProjectileMaxSpeedOverride: parseNumber(data.mProjectileMaxSpeedOverride),
    mProjectileHealthOverride: parseNumber(data.mProjectileHealthOverride),
    mProjectileLifespan: parseNumber(data.mProjectileLifespan),
    mProjectileStickspan: parseNumber(data.mProjectileStickspan),
    mCanTakeDamageBySameProjectileOrChild: parseBoolean(
      data.mCanTakeDamageBySameProjectileOrChild,
    ),
    mHomingProjectile: parseBoolean(data.mHomingProjectile),
    mHomingNeedsValidTarget: parseBoolean(data.mHomingNeedsValidTarget),
    mMaxHomingAccelerationMagnitudeOverride: parseNumber(
      data.mMaxHomingAccelerationMagnitudeOverride,
    ),
    mHomingOverlapSize: parseNumber(data.mHomingOverlapSize),
    mHomingAngleLimit: parseNumber(data.mHomingAngleLimit),
  };
}
