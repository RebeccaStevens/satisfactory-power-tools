import assert from "node:assert/strict";

import { isVariablePower } from "~/scripts/parse-raw-game-data/docs/parsers/buildable-manufacturer-variable-power";

import type { Color } from "../types";
import { ResourceForm } from "../types";

import { loadData } from "./load";

export function getDocsData() {
  const data = loadData();

  const filteredItems = Object.fromEntries(
    data.items.map((item) => [
      item.ClassName,
      {
        name: item.mDisplayName,
        energy: item.mEnergyValue,
        transporter:
          item.mForm === ResourceForm.Liquid || item.mForm === ResourceForm.Gas
            ? "pipe"
            : "belt",
        color:
          item.mForm === ResourceForm.Liquid
            ? stringifyColor(item.mFluidColor)
            : item.mForm === ResourceForm.Gas
            ? stringifyColor(item.mGasColor)
            : null,
        sinkable: item.mCanBeDiscarded,
        points: item.mResourceSinkPoints,
      },
    ]),
  );

  const filteredMachines = Object.fromEntries(
    data.machines.map((machine) => {
      const variablePower = isVariablePower(machine);
      return [
        machine.ClassName,
        {
          name: machine.mDisplayName,
          manufacturingSpeed: machine.mManufacturingSpeed,
          powerConsumption: variablePower
            ? (machine.mEstimatedMininumPowerConsumption +
                machine.mEstimatedMaximumPowerConsumption) /
              2
            : machine.mPowerConsumption,
          minPowerConsumption: variablePower
            ? machine.mEstimatedMininumPowerConsumption
            : machine.mPowerConsumption,
          maxPowerConsumption: variablePower
            ? machine.mEstimatedMaximumPowerConsumption
            : machine.mPowerConsumption,
          powerConsumptionExponent: machine.mPowerConsumptionExponent,
          minimumProducingTime: machine.mMinimumProducingTime,
          minPotential: machine.mCanChangePotential ? machine.mMinPotential : 1,
          maxPotential: machine.mCanChangePotential ? machine.mMaxPotential : 1,
          maxPotentialIncreasePerCrystal: machine.mCanChangePotential
            ? machine.mMaxPotentialIncreasePerCrystal
            : 0,
        },
      ];
    }),
  );

  const filteredRecipes = Object.fromEntries(
    data.recipes.map((recipe) => {
      return [
        recipe.ClassName,
        {
          name: recipe.mDisplayName,
          ingredients: recipe.mIngredients,
          products: recipe.mProduct,
          duration: recipe.mManufactoringDuration,
          producedIn: recipe.mProducedIn,
          variablePowerConsumptionConstant:
            recipe.mVariablePowerConsumptionConstant,
          variablePowerConsumptionFactor:
            recipe.mVariablePowerConsumptionFactor,
        },
      ];
    }),
  );

  return {
    items: filteredItems,
    machines: filteredMachines,
    recipes: filteredRecipes,
  };
}

function stringifyColor({ red, green, blue, alpha }: Readonly<Color>): string {
  return [red, green, blue, alpha]
    .map((value) => {
      assert(
        Number.isInteger(value) && value >= 0 && value <= 255,
        `Invalid color value: ${value}`,
      );
      return value.toString(16).padStart(2, "0");
    })
    .join("");
}
