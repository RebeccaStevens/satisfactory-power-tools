import assert from "node:assert/strict";

import { parseBase } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseAmounts,
  parseClasses,
  parseGameEvents,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const base = parseBase(data);

  assert(Object.hasOwn(data, "mIngredients"));
  assert(Object.hasOwn(data, "mProduct"));
  assert(Object.hasOwn(data, "mManufacturingMenuPriority"));
  assert(Object.hasOwn(data, "mManufactoringDuration"));
  assert(Object.hasOwn(data, "mManualManufacturingMultiplier"));
  assert(Object.hasOwn(data, "mProducedIn"));
  assert(Object.hasOwn(data, "mRelevantEvents"));
  assert(Object.hasOwn(data, "mVariablePowerConsumptionConstant"));
  assert(Object.hasOwn(data, "mVariablePowerConsumptionFactor"));

  return {
    ...base,
    mIngredients: parseAmounts(data.mIngredients),
    mProduct: parseAmounts(data.mProduct),
    mManufacturingMenuPriority: parseNumber(data.mManufacturingMenuPriority),
    mManufactoringDuration: parseNumber(data.mManufactoringDuration),
    mManualManufacturingMultiplier: parseNumber(
      data.mManualManufacturingMultiplier,
    ),
    mProducedIn: parseClasses(data.mProducedIn),
    mRelevantEvents: parseGameEvents(data.mRelevantEvents),
    mVariablePowerConsumptionConstant: parseNumber(
      data.mVariablePowerConsumptionConstant,
    ),
    mVariablePowerConsumptionFactor: parseNumber(
      data.mVariablePowerConsumptionFactor,
    ),
  };
}
