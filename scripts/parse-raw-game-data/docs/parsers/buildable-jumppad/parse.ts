import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseRotation3D,
  parseScale3D,
  parseBoolean,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assert("mPowerBankCapacity" in data);
  assert("mLaunchPowerCost" in data);
  assert("mChargeRateMultiplier" in data);
  assert("mCurrentPowerLevel" in data);
  assert("mLaunchVelocity" in data);
  assert("mLaunchAngle" in data);
  assert("mPlayerChainJumpResetTime" in data);
  assert("mHasPowerForLaunch" in data);
  assert("mTrajectoryData" in data);
  assert("mTrajectoryMeshScale" in data);
  assert("mTrajectoryMeshRotation" in data);
  assert("mDestinationMeshHeightOffset" in data);
  assert("mNumArrows" in data);
  assert("mTrajectoryGravityMultiplier" in data);
  assert("mShowTrajectoryCounter" in data);

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
