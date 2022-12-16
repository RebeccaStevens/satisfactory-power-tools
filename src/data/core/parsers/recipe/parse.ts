import assert from "node:assert/strict";

import {
  parseString,
  parseNumber,
  parseAmounts,
  parseClasses,
  parseGameEvents,
} from "~/data/core/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));
  assert(Object.hasOwn(data, "ClassName"));
  assert(Object.hasOwn(data, "mDisplayName"));
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
    ClassName: parseString(data.ClassName),
    mDisplayName: parseString(data.mDisplayName),
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
