import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parsePipeConnections,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assert("mLastFlowUpdate" in data);
  assert("mUpdateFlowTime" in data);
  assert("mAnimSpeed" in data);
  assert("mLastFlowValue" in data);
  assert("mTimeScaleOffset" in data);
  assert("mMaxPressure" in data);
  assert("mDesignPressure" in data);
  assert("mDefaultFlowLimit" in data);
  assert("mUserFlowLimit" in data);
  assert("mMinimumFlowPercentForStandby" in data);
  assert("mRadius" in data);
  assert("mFluidBoxVolume" in data);
  assert("mPipeConnections" in data);

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
