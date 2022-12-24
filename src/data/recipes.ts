import type { Item, Machine, Recipe } from "~/data/types";
import {
  asQuantity,
  asSeconds,
  asVariablePowerConsumptionConstant,
  asVariablePowerConsumptionFactor,
} from "~/data/types";
import { isNotNull } from "~/utils";

import type RawGameData from "./game-data.json";

export function getRecipes(
  rawRecipes: Readonly<typeof RawGameData["recipes"]>,
  items: ReadonlyMap<string, Item>,
  machines: ReadonlyMap<string, Machine>,
) {
  function linkAmounts(data: Record<string, number>) {
    return new Map(
      Object.entries(data)
        .map(([id, amount]) => {
          const item = items.get(id);
          if (item === undefined) {
            return null;
          }
          return [item, asQuantity(amount)] as const;
        })
        .filter(isNotNull),
    );
  }

  return new Map(
    Object.entries(rawRecipes).map(([id, data]): [string, Recipe] => {
      const ingredients = linkAmounts(data.ingredients);
      const products = linkAmounts(data.products);
      const duration = asSeconds(data.duration);
      const producedIn = new Set(
        data.producedIn
          .map((machineId) => machines.get(machineId) ?? null)
          .filter(isNotNull),
      );
      const variablePowerConsumptionConstant =
        asVariablePowerConsumptionConstant(
          data.variablePowerConsumptionConstant,
        );
      const variablePowerConsumptionFactor = asVariablePowerConsumptionFactor(
        data.variablePowerConsumptionFactor,
      );
      return [
        id,
        {
          id,
          ingredients,
          products,
          duration,
          producedIn,
          variablePowerConsumptionConstant,
          variablePowerConsumptionFactor,
        },
      ];
    }),
  );
}
