import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parsePipeConnections,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assertPropertyExists(data, "mLastFlowUpdate");
  assertPropertyExists(data, "mUpdateFlowTime");
  assertPropertyExists(data, "mAnimSpeed");
  assertPropertyExists(data, "mLastFlowValue");
  assertPropertyExists(data, "mTimeScaleOffset");
  assertPropertyExists(data, "mMaxPressure");
  assertPropertyExists(data, "mDesignPressure");
  assertPropertyExists(data, "mDefaultFlowLimit");
  assertPropertyExists(data, "mUserFlowLimit");
  assertPropertyExists(data, "mMinimumFlowPercentForStandby");
  assertPropertyExists(data, "mRadius");
  assertPropertyExists(data, "mFluidBoxVolume");
  assertPropertyExists(data, "mPipeConnections");

  return {
    ...buildableBuilding,
    mLastFlowUpdate: parseNumber(data.mLastFlowUpdate),
    mUpdateFlowTime: parseNumber(data.mUpdateFlowTime),
    mAnimSpeed: parseNumber(data.mAnimSpeed),
    mLastFlowValue: parseNumber(data.mLastFlowValue),
    mTimeScaleOffset: parseNumber(data.mTimeScaleOffset),
    mMaxPressure: parseNumber(data.mMaxPressure),
    mDesignPressure: parseNumber(data.mDesignPressure),
    mDefaultFlowLimit: parseNumber(data.mDefaultFlowLimit),
    mUserFlowLimit: parseNumber(data.mUserFlowLimit),
    mMinimumFlowPercentForStandby: parseNumber(
      data.mMinimumFlowPercentForStandby,
    ),
    mRadius: parseNumber(data.mRadius),
    mFluidBoxVolume: parseNumber(data.mFluidBoxVolume),
    mPipeConnections: parsePipeConnections(data.mPipeConnections),
  };
}
