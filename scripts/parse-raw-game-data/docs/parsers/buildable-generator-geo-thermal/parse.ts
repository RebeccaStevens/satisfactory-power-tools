import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber, parseBoolean } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assertPropertyExists(data, "mProductionEffectsRunning");
  assertPropertyExists(data, "mVariablePowerProductionConstant");
  assertPropertyExists(data, "mVariablePowerProductionFactor");
  assertPropertyExists(data, "mVariablePowerProductionCycleLength");
  assertPropertyExists(data, "mMinPowerProduction");
  assertPropertyExists(data, "mMaxPowerProduction");
  assertPropertyExists(data, "mVariablePowerProductionCycleOffset");
  assertPropertyExists(data, "mPowerProduction");
  assertPropertyExists(data, "mLoadPercentage");

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
