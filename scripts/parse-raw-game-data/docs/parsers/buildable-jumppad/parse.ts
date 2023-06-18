import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseRotation3D,
  parseScale3D,
  parseBoolean,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assertPropertyExists(data, "mPowerBankCapacity");
  assertPropertyExists(data, "mLaunchPowerCost");
  assertPropertyExists(data, "mChargeRateMultiplier");
  assertPropertyExists(data, "mCurrentPowerLevel");
  assertPropertyExists(data, "mLaunchVelocity");
  assertPropertyExists(data, "mLaunchAngle");
  assertPropertyExists(data, "mPlayerChainJumpResetTime");
  assertPropertyExists(data, "mHasPowerForLaunch");
  assertPropertyExists(data, "mTrajectoryData");
  assertPropertyExists(data, "mTrajectoryMeshScale");
  assertPropertyExists(data, "mTrajectoryMeshRotation");
  assertPropertyExists(data, "mDestinationMeshHeightOffset");
  assertPropertyExists(data, "mNumArrows");
  assertPropertyExists(data, "mTrajectoryGravityMultiplier");
  assertPropertyExists(data, "mShowTrajectoryCounter");

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
