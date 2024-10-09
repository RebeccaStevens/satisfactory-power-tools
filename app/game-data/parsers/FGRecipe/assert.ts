import { assert } from "chai";

import { assertVendorAbstractBase } from "~/game-data/parsers/abstractBase/assert";

export function assertVendorFGRecipe(
  data: unknown,
): asserts data is VendorFGRecipe {
  assertVendorAbstractBase(data);

  assert.isEmpty(
    [
      "FullName",
      "mIngredients",
      "mProduct",
      "mManufacturingMenuPriority",
      "mManufactoringDuration",
      "mManualManufacturingMultiplier",
      "mProducedIn",
      "mRelevantEvents",
      "mVariablePowerConsumptionConstant",
      "mVariablePowerConsumptionFactor",
    ].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGRecipe",
  );
}

export type VendorFGRecipe = {
  FullName: string;
  mIngredients: string;
  mProduct: string;
  mManufacturingMenuPriority: string;
  mManufactoringDuration: string;
  mManualManufacturingMultiplier: string;
  mProducedIn: string;
  mRelevantEvents: string;
  mVariablePowerConsumptionConstant: string;
  mVariablePowerConsumptionFactor: string;
};
