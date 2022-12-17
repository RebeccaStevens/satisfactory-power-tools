import assert from "node:assert/strict";

import { parseBaseAmmoType } from "~/scripts/parse-raw-game-data/parsers";
import { parseNumber, parseBoolean } from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const ammo = parseBaseAmmoType(data);

  assert(Object.hasOwn(data, "mInitialProjectileSpeedOverride"));
  assert(Object.hasOwn(data, "mProjectileMaxSpeedOverride"));
  assert(Object.hasOwn(data, "mProjectileHealthOverride"));
  assert(Object.hasOwn(data, "mProjectileLifespan"));
  assert(Object.hasOwn(data, "mProjectileStickspan"));
  assert(Object.hasOwn(data, "mCanTakeDamageBySameProjectileOrChild"));
  assert(Object.hasOwn(data, "mHomingProjectile"));
  assert(Object.hasOwn(data, "mHomingNeedsValidTarget"));
  assert(Object.hasOwn(data, "mMaxHomingAccelerationMagnitudeOverride"));
  assert(Object.hasOwn(data, "mHomingOverlapSize"));
  assert(Object.hasOwn(data, "mHomingAngleLimit"));

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
