import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import { parseBoolean, parseNumber, parseStackSize } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);
  assert(Object.hasOwn(data, "mPowerConsumption"));
  assert(Object.hasOwn(data, "mPowerConsumptionExponent"));
  assert(Object.hasOwn(data, "mDoesHaveShutdownAnimation"));
  assert(Object.hasOwn(data, "mMinimumProducingTime"));
  assert(Object.hasOwn(data, "mMinimumStoppedTime"));
  assert(Object.hasOwn(data, "mCanEverMonitorProductivity"));
  assert(Object.hasOwn(data, "mCanChangePotential"));
  assert(Object.hasOwn(data, "mMinPotential"));
  assert(Object.hasOwn(data, "mMaxPotential"));
  assert(Object.hasOwn(data, "mMaxPotentialIncreasePerCrystal"));
  assert(Object.hasOwn(data, "mFluidStackSizeDefault"));
  assert(Object.hasOwn(data, "mFluidStackSizeMultiplier"));
  assert(Object.hasOwn(data, "mEffectUpdateInterval"));
  assert(Object.hasOwn(data, "mAddToSignificanceManager"));
  assert(Object.hasOwn(data, "mSignificanceRange"));

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
