import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBase } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseAmounts,
  parseClasses,
  parseGameEvents,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const base = parseBase(data);

  assertPropertyExists(data, "mIngredients");
  assertPropertyExists(data, "mProduct");
  assertPropertyExists(data, "mManufacturingMenuPriority");
  assertPropertyExists(data, "mManufactoringDuration");
  assertPropertyExists(data, "mManualManufacturingMultiplier");
  assertPropertyExists(data, "mProducedIn");
  assertPropertyExists(data, "mRelevantEvents");
  assertPropertyExists(data, "mVariablePowerConsumptionConstant");
  assertPropertyExists(data, "mVariablePowerConsumptionFactor");

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
