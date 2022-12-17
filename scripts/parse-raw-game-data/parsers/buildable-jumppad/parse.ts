import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import {
  parseNumber,
  parseRotation3D,
  parseScale3D,
  parseBoolean,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableBuilding = parseBuildableBuilding(data);

  assert(Object.hasOwn(data, "mPowerBankCapacity"));
  assert(Object.hasOwn(data, "mLaunchPowerCost"));
  assert(Object.hasOwn(data, "mChargeRateMultiplier"));
  assert(Object.hasOwn(data, "mCurrentPowerLevel"));
  assert(Object.hasOwn(data, "mLaunchVelocity"));
  assert(Object.hasOwn(data, "mLaunchAngle"));
  assert(Object.hasOwn(data, "mPlayerChainJumpResetTime"));
  assert(Object.hasOwn(data, "mHasPowerForLaunch"));
  assert(Object.hasOwn(data, "mTrajectoryData"));
  assert(Object.hasOwn(data, "mTrajectoryMeshScale"));
  assert(Object.hasOwn(data, "mTrajectoryMeshRotation"));
  assert(Object.hasOwn(data, "mDestinationMeshHeightOffset"));
  assert(Object.hasOwn(data, "mNumArrows"));
  assert(Object.hasOwn(data, "mTrajectoryGravityMultiplier"));
  assert(Object.hasOwn(data, "mShowTrajectoryCounter"));

  return {
    ...buildableBuilding,
    mPowerBankCapacity: parseNumber(data.mPowerBankCapacity),
    mLaunchPowerCost: parseNumber(data.mLaunchPowerCost),
    mChargeRateMultiplier: parseNumber(data.mChargeRateMultiplier),
    mCurrentPowerLevel: parseNumber(data.mCurrentPowerLevel),
    mLaunchVelocity: parseNumber(data.mLaunchVelocity),
    mLaunchAngle: parseNumber(data.mLaunchAngle),
    mPlayerChainJumpResetTime: parseNumber(data.mPlayerChainJumpResetTime),
    mHasPowerForLaunch: parseBoolean(data.mHasPowerForLaunch),
    mTrajectoryMeshScale: parseScale3D(data.mTrajectoryMeshScale),
    mTrajectoryMeshRotation: parseRotation3D(data.mTrajectoryMeshRotation),
    mDestinationMeshHeightOffset: parseNumber(
      data.mDestinationMeshHeightOffset,
    ),
    mNumArrows: parseNumber(data.mNumArrows),
    mTrajectoryGravityMultiplier: parseNumber(
      data.mTrajectoryGravityMultiplier,
    ),
    mShowTrajectoryCounter: parseNumber(data.mShowTrajectoryCounter),
  };
}
