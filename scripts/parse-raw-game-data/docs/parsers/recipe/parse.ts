import assert from "node:assert/strict";

import { parseBase } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseAmounts,
  parseClasses,
  parseGameEvents,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const base = parseBase(data);

  assert("mIngredients" in data);
  assert("mProduct" in data);
  assert("mManufacturingMenuPriority" in data);
  assert("mManufactoringDuration" in data);
  assert("mManualManufacturingMultiplier" in data);
  assert("mProducedIn" in data);
  assert("mRelevantEvents" in data);
  assert("mVariablePowerConsumptionConstant" in data);
  assert("mVariablePowerConsumptionFactor" in data);

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
