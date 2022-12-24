import assert from "node:assert/strict";

import { snakeCase } from "change-case";

import type { Item } from "~/scripts/parse-raw-game-data/docs/parsers";
import { isVariablePower } from "~/scripts/parse-raw-game-data/docs/parsers/buildable-manufacturer-variable-power";
import { assertNever } from "~/utils";

import itemTiers from "../data/ItemTeirs.json" assert { type: "json" };
import type { Color } from "../types";
import { SchematicType, ResourceForm } from "../types";

import { loadData } from "./load";

export function getDocsData() {
  const data = loadData();

  const filteredItems = Object.fromEntries(
    data.items.map((item) => [
      item.ClassName,
      {
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
        icon:
          item.mPersistentBigIcon === null
            ? null
            : `items/${getIconPath(item.mPersistentBigIcon)}`,
        tier: getItemTier(item),
        type: getItemType(item),
      },
    ]),
  );

  const filteredMachines = Object.fromEntries(
    data.machines.map((machine) => {
      const variablePower = isVariablePower(machine);
      return [
        machine.ClassName,
        {
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

  const filteredSchematics = Object.fromEntries(
    Object.entries(
      data.schematics
        .filter(
          (schematic) =>
            schematic.mType !== SchematicType.Custom &&
            schematic.mType !== SchematicType.ResourceSink,
        )
        .map((schematic) => {
          return [
            schematic.mType === SchematicType.Alternate
              ? "alternate"
              : schematic.mType === SchematicType.HardDrive
              ? "hard-drive"
              : schematic.mType === SchematicType.MAM
              ? "mam"
              : schematic.mType === SchematicType.Milestone
              ? "milestone"
              : schematic.mType === SchematicType.Tutorial
              ? "tutorial"
              : assertNever(schematic.mType),
            [
              schematic.ClassName,
              {
                techTier: schematic.mTechTier,
                icon:
                  schematic.mSchematicIcon === null
                    ? null
                    : `schematics/${getIconPath(schematic.mSchematicIcon)}`,
              },
            ] as const,
          ] as const;
        })
        .reduce<Record<string, Array<readonly [string, unknown]>>>(
          (carry, [t, ent]) => {
            // eslint-disable-next-line no-multi-assign
            const classes = (carry[t] ??= []);
            classes.push(ent);
            return carry;
          },
          {},
        ),
    )
      .map(
        ([t, s]) =>
          [
            t,
            Object.fromEntries(s.sort((a, b) => a[0].localeCompare(b[0]))),
          ] as const,
      )
      .sort((a, b) => a[0].localeCompare(b[0])),
  );

  return {
    items: filteredItems,
    machines: filteredMachines,
    recipes: filteredRecipes,
    schematics: filteredSchematics,
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

export function getIconPath(path: string) {
  return snakeCase(
    path
      .slice(path.lastIndexOf("/") + 1)
      .replace(/^Icon/u, "")
      .replace(/_\d*$/u, ""),
  );
}

function getItemTier(item: Readonly<Item>) {
  const data = (itemTiers as any)[item.ClassName];
  assert(data?.tier !== undefined, `missing tier for ${item.ClassName}`);
  return data.tier;
}

function getItemType(item: Readonly<Item>) {
  const data = (itemTiers as any)[item.ClassName];
  assert(data?.type !== undefined, `missing type for ${item.ClassName}`);
  return data.type;
}
