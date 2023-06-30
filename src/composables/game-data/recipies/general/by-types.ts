import { div, mul } from "uom-ts";

import { useGeneratorFuelMachines } from "~/composables/game-data";
import { gameData } from "~/data";
import {
  type GeneralItem,
  type Idable,
  type Quantity,
  asVariablePowerConsumptionConstant,
  asVariablePowerConsumptionFactor,
  type Recipe,
  isProductionMachine,
} from "~/data/types";

/**
 * Cache the list of  recipes.
 */
let m_Recipes: ReadonlyArray<Readonly<Recipe>> | undefined = undefined;

/**
 * Get the  recipes.
 */
export function useRecipes() {
  if (m_Recipes !== undefined) {
    return m_Recipes;
  }
  m_Recipes = [...gameData.recipes.values()];
  return m_Recipes;
}

/**
 * Cache the list of generator fuel recipes.
 */
let m_generatorFuelRecipesMap:
  | Readonly<ReadonlyMap<string, Readonly<Recipe>>>
  | undefined = undefined;

/**
 * Get the generator fuel recipes.
 */
export function useGeneratorFuelRecipesMap() {
  if (m_generatorFuelRecipesMap !== undefined) {
    return m_generatorFuelRecipesMap;
  }
  const fuelGenerators = useGeneratorFuelMachines();
  m_generatorFuelRecipesMap = new Map(
    fuelGenerators.flatMap((fuelGenerator) =>
      fuelGenerator.fuel.map((fuelType): [string, Recipe] => {
        const id = `recipe-power-${fuelGenerator.id}-${fuelType.fuel.id}`;
        return [
          id,
          {
            id,
            ingredients: new Map<GeneralItem, Quantity>([
              [fuelType.fuel, fuelGenerator.fuelLoadAmount],
              ...((fuelType.supplemental === null
                ? []
                : [
                    [
                      fuelType.supplemental,
                      fuelGenerator.supplementalLoadAmount,
                    ],
                  ]) as Array<[GeneralItem, Quantity]>),
            ]),
            products: new Map<GeneralItem, Quantity>([
              ...((fuelType.byproduct === null
                ? []
                : [fuelType.byproduct]) as Array<[GeneralItem, Quantity]>),
            ]),
            duration: div(
              mul(fuelGenerator.fuelLoadAmount, fuelType.fuel.energy),
              fuelGenerator.powerProduction,
            ),
            producedIn: new Set<Idable>([fuelGenerator]),
            variablePowerConsumptionConstant:
              asVariablePowerConsumptionConstant(0),
            variablePowerConsumptionFactor: asVariablePowerConsumptionFactor(1),
          },
        ];
      }),
    ),
  );

  return m_generatorFuelRecipesMap;
}

/**
 * Cache the list of generator fuel recipes.
 */
let m_generatorFuelRecipes: ReadonlyArray<Readonly<Recipe>> | undefined =
  undefined;

/**
 * Get the generator fuel recipes.
 */
export function useGeneratorFuelRecipes() {
  if (m_generatorFuelRecipes !== undefined) {
    return m_generatorFuelRecipes;
  }
  m_generatorFuelRecipes = [...useGeneratorFuelRecipesMap().values()];
  return m_generatorFuelRecipes;
}

/**
 * Cache the list of automatable recipes.
 */
let m_automatableRecipes: ReadonlyArray<Readonly<Recipe>> | undefined =
  undefined;

/**
 * Get the automatable recipes.
 */
export function useAutomatableRecipes() {
  if (m_automatableRecipes !== undefined) {
    return m_automatableRecipes;
  }
  m_automatableRecipes = [
    ...useRecipes().filter((recipe) =>
      recipe.producedIn.values().some(isProductionMachine),
    ),
    ...useGeneratorFuelRecipes().filter((recipe) =>
      recipe.producedIn.values().some(
        (producer) =>
          // TODO: refactor out
          producer.id !== "Build_GeneratorBiomass_C",
      ),
    ),
  ];
  return m_automatableRecipes;
}
