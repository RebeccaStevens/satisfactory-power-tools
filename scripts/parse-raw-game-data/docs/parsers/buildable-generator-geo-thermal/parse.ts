import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber, parseBoolean } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assert("mProductionEffectsRunning" in data);
  assert("mVariablePowerProductionConstant" in data);
  assert("mVariablePowerProductionFactor" in data);
  assert("mVariablePowerProductionCycleLength" in data);
  assert("mMinPowerProduction" in data);
  assert("mMaxPowerProduction" in data);
  assert("mVariablePowerProductionCycleOffset" in data);
  assert("mPowerProduction" in data);
  assert("mLoadPercentage" in data);

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
