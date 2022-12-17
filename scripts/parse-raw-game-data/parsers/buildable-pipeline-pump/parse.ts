import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import {
  parseNumber,
  parsePipeConnections,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableBuilding = parseBuildableBuilding(data);

  assert(Object.hasOwn(data, "mLastFlowUpdate"));
  assert(Object.hasOwn(data, "mUpdateFlowTime"));
  assert(Object.hasOwn(data, "mAnimSpeed"));
  assert(Object.hasOwn(data, "mLastFlowValue"));
  assert(Object.hasOwn(data, "mTimeScaleOffset"));
  assert(Object.hasOwn(data, "mMaxPressure"));
  assert(Object.hasOwn(data, "mDesignPressure"));
  assert(Object.hasOwn(data, "mDefaultFlowLimit"));
  assert(Object.hasOwn(data, "mUserFlowLimit"));
  assert(Object.hasOwn(data, "mMinimumFlowPercentForStandby"));
  assert(Object.hasOwn(data, "mRadius"));
  assert(Object.hasOwn(data, "mFluidBoxVolume"));
  assert(Object.hasOwn(data, "mPipeConnections"));

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
