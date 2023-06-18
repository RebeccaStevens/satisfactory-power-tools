import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseBoolean,
  parseNumber,
  parseStackSize,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mPowerConsumption");
  assertPropertyExists(data, "mPowerConsumptionExponent");
  assertPropertyExists(data, "mDoesHaveShutdownAnimation");
  assertPropertyExists(data, "mMinimumProducingTime");
  assertPropertyExists(data, "mMinimumStoppedTime");
  assertPropertyExists(data, "mCanEverMonitorProductivity");
  assertPropertyExists(data, "mCanChangePotential");
  assertPropertyExists(data, "mMinPotential");
  assertPropertyExists(data, "mMaxPotential");
  assertPropertyExists(data, "mMaxPotentialIncreasePerCrystal");
  assertPropertyExists(data, "mFluidStackSizeDefault");
  assertPropertyExists(data, "mFluidStackSizeMultiplier");
  assertPropertyExists(data, "mEffectUpdateInterval");
  assertPropertyExists(data, "mAddToSignificanceManager");
  assertPropertyExists(data, "mSignificanceRange");

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
