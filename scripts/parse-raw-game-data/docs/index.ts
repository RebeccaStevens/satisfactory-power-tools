import { assert } from "chai";
import { snakeCase } from "change-case";

import { type Item } from "~/scripts/parse-raw-game-data/docs/parsers";
import { isVariablePower } from "~/scripts/parse-raw-game-data/docs/parsers/buildable-manufacturer-variable-power";
import { assertNever } from "~/utils";

import itemTiers from "../data/ItemTeirs.json" assert { type: "json" };
import { type Color } from "../types";
import { SchematicType, ResourceForm } from "../types";

import { loadData } from "./load";

export function getDocsData() {
  const data = loadData();

  const items = Object.fromEntries(
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
        categories: item.mSubCategories,
        menuPriority: item.mMenuPriority,
        tier: getItemTier(item),
        type: getItemType(item),
      },
    ]),
  );

  const buildings = Object.fromEntries(
    data.buildings.map((building) => [
      building.ClassName,
      {
        icon:
          building.mPersistentBigIcon === null
            ? null
            : `buildings/${getIconPath(building.mPersistentBigIcon)}`,
        categories: building.mSubCategories,
        menuPriority: building.mMenuPriority,
      },
    ]),
  );

  const productionMachines = Object.fromEntries(
    data.machines.production.map((machine) => {
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
          minPotential: machine.mCanChangePotential ? machine.mMinPotential : 1,
          maxPotential: machine.mCanChangePotential ? machine.mMaxPotential : 1,
          maxPotentialIncreasePerCrystal: machine.mCanChangePotential
            ? machine.mMaxPotentialIncreasePerCrystal
            : 0,
        },
      ];
    }),
  );

  const generatorFuelMachines = Object.fromEntries(
    data.machines.generator.fuel.map((machine) => {
      return [
        machine.ClassName,
        {
          fuel: machine.mFuel.map((fuel) => ({
            fuel: fuel.mFuelClass,
            supplemental: fuel.mSupplementalResourceClass,
            byproduct:
              fuel.mByproduct === null
                ? null
                : ([fuel.mByproduct, fuel.mByproductAmount] as const),
          })),
          fuelLoadAmount: machine.mFuelLoadAmount,
          fuelTransporter:
            machine.mFuelResourceForm === ResourceForm.Liquid ||
            machine.mFuelResourceForm === ResourceForm.Gas
              ? "pipe"
              : "belt",
          requiresSupplementalResource: machine.mRequiresSupplementalResource,
          supplementalLoadAmount: machine.mSupplementalLoadAmount,
          supplementalToPowerRatio: machine.mSupplementalToPowerRatio,
          powerProduction: machine.mPowerProduction,
          minPotential: machine.mCanChangePotential ? machine.mMinPotential : 1,
          maxPotential: machine.mCanChangePotential ? machine.mMaxPotential : 1,
          maxPotentialIncreasePerCrystal: machine.mCanChangePotential
            ? machine.mMaxPotentialIncreasePerCrystal
            : 0,
        },
      ];
    }),
  );

  const generatorGeoThermalMachines = Object.fromEntries(
    data.machines.generator.geoThermal.map((machine) => {
      return [
        machine.ClassName,
        {
          powerProduction: machine.mPowerProduction,
          minPotential: machine.mCanChangePotential ? machine.mMinPotential : 1,
          maxPotential: machine.mCanChangePotential ? machine.mMaxPotential : 1,
          maxPotentialIncreasePerCrystal: machine.mCanChangePotential
            ? machine.mMaxPotentialIncreasePerCrystal
            : 0,
        },
      ];
    }),
  );

  const recipes = Object.fromEntries(
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

  const schematics = Object.fromEntries(
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
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- see: https://github.com/typescript-eslint/typescript-eslint/issues/6635.
            carry[t] ??= [];
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const classes = carry[t]!;
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
    items,
    machines: {
      production: productionMachines,
      generator: {
        fuel: generatorFuelMachines,
        geoThermal: generatorGeoThermalMachines,
      },
    },
    recipes,
    schematics,
    buildings,
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

type ItemTiers = Record<string, (typeof itemTiers)[keyof typeof itemTiers]>;

function getItemTier(item: Readonly<Item>) {
  const data = (itemTiers as ItemTiers)[item.ClassName];
  assert(data?.tier !== undefined, `missing tier for ${item.ClassName}`);
  return data.tier;
}

function getItemType(item: Readonly<Item>) {
  const data = (itemTiers as ItemTiers)[item.ClassName];
  assert(data?.type !== undefined, `missing type for ${item.ClassName}`);
  return data.type;
}
