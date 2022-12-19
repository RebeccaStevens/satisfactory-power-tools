import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseBoolean,
  parseNumber,
  parseStackSize,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assert("mPowerConsumption" in data);
  assert("mPowerConsumptionExponent" in data);
  assert("mDoesHaveShutdownAnimation" in data);
  assert("mMinimumProducingTime" in data);
  assert("mMinimumStoppedTime" in data);
  assert("mCanEverMonitorProductivity" in data);
  assert("mCanChangePotential" in data);
  assert("mMinPotential" in data);
  assert("mMaxPotential" in data);
  assert("mMaxPotentialIncreasePerCrystal" in data);
  assert("mFluidStackSizeDefault" in data);
  assert("mFluidStackSizeMultiplier" in data);
  assert("mEffectUpdateInterval" in data);
  assert("mAddToSignificanceManager" in data);
  assert("mSignificanceRange" in data);

  return {
    ...buildable,
    mPowerConsumption: parseNumber(data.mPowerConsumption),
    mPowerConsumptionExponent: parseNumber(data.mPowerConsumptionExponent),
    mDoesHaveShutdownAnimation: parseBoolean(data.mDoesHaveShutdownAnimation),
    mMinimumProducingTime: parseNumber(data.mMinimumProducingTime),
    mMinimumStoppedTime: parseNumber(data.mMinimumStoppedTime),
    mCanEverMonitorProductivity: parseBoolean(data.mCanEverMonitorProductivity),
    mCanChangePotential: parseBoolean(data.mCanChangePotential),
    mMinPotential: parseNumber(data.mMinPotential),
    mMaxPotential: parseNumber(data.mMaxPotential),
    mMaxPotentialIncreasePerCrystal: parseNumber(
      data.mMaxPotentialIncreasePerCrystal,
    ),
    mFluidStackSizeDefault: parseStackSize(data.mFluidStackSizeDefault),
    mFluidStackSizeMultiplier: parseNumber(data.mFluidStackSizeMultiplier),
    mEffectUpdateInterval: parseNumber(data.mEffectUpdateInterval),
    mAddToSignificanceManager: parseBoolean(data.mAddToSignificanceManager),
    mSignificanceRange: parseNumber(data.mSignificanceRange),
  };
}
