import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBaseAmmoType } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber, parseBoolean } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const ammo = parseBaseAmmoType(data);

  assertPropertyExists(data, "mInitialProjectileSpeedOverride");
  assertPropertyExists(data, "mProjectileMaxSpeedOverride");
  assertPropertyExists(data, "mProjectileHealthOverride");
  assertPropertyExists(data, "mProjectileLifespan");
  assertPropertyExists(data, "mProjectileStickspan");
  assertPropertyExists(data, "mCanTakeDamageBySameProjectileOrChild");
  assertPropertyExists(data, "mHomingProjectile");
  assertPropertyExists(data, "mHomingNeedsValidTarget");
  assertPropertyExists(data, "mMaxHomingAccelerationMagnitudeOverride");
  assertPropertyExists(data, "mHomingOverlapSize");
  assertPropertyExists(data, "mHomingAngleLimit");

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
