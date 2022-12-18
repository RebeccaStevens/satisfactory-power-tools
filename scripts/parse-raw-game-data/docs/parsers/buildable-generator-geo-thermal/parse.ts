import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber, parseBoolean } from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableBuilding = parseBuildableBuilding(data);

  assert(Object.hasOwn(data, "mProductionEffectsRunning"));
  assert(Object.hasOwn(data, "mVariablePowerProductionConstant"));
  assert(Object.hasOwn(data, "mVariablePowerProductionFactor"));
  assert(Object.hasOwn(data, "mVariablePowerProductionCycleLength"));
  assert(Object.hasOwn(data, "mMinPowerProduction"));
  assert(Object.hasOwn(data, "mMaxPowerProduction"));
  assert(Object.hasOwn(data, "mVariablePowerProductionCycleOffset"));
  assert(Object.hasOwn(data, "mPowerProduction"));
  assert(Object.hasOwn(data, "mLoadPercentage"));

  return {
    ...buildableBuilding,
    mProductionEffectsRunning: parseBoolean(data.mProductionEffectsRunning),
    mVariablePowerProductionConstant: parseNumber(
      data.mVariablePowerProductionConstant,
    ),
    mVariablePowerProductionFactor: parseNumber(
      data.mVariablePowerProductionFactor,
    ),
    mVariablePowerProductionCycleLength: parseNumber(
      data.mVariablePowerProductionCycleLength,
    ),
    mMinPowerProduction: parseNumber(data.mMinPowerProduction),
    mMaxPowerProduction: parseNumber(data.mMaxPowerProduction),
    mVariablePowerProductionCycleOffset: parseNumber(
      data.mVariablePowerProductionCycleOffset,
    ),
    mPowerProduction: parseNumber(data.mPowerProduction),
    mLoadPercentage: parseNumber(data.mLoadPercentage),
  };
}
