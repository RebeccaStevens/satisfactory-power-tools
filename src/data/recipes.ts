import type { Id, Item, Machine, Recipe } from "~/data/types";
import {
  asQuantity,
  asId,
  asName,
  asSeconds,
  asVariablePowerConsumptionConstant,
  asVariablePowerConsumptionFactor,
} from "~/data/types";
import { isNotNull } from "~/utils";

import type RawGameData from "./game-data.json";

export function getRecipes(
  rawRecipes: Readonly<typeof RawGameData["recipes"]>,
  items: ReadonlyMap<Id, Item>,
  machines: ReadonlyMap<Id, Machine>,
) {
  function linkAmounts(data: Record<string, number>) {
    return new Map(
      Object.entries(data)
        .map(([id, amount]) => {
          const item = items.get(asId(id));
          if (item === undefined) {
            return null;
          }
          return [item, asQuantity(amount)] as const;
        })
        .filter(isNotNull),
    );
  }

  return new Map(
    Object.entries(rawRecipes).map(([rawId, data]): [Id, Recipe] => {
      const id = asId(rawId);
      const name = asName(data.name);
      const ingredients = linkAmounts(data.ingredients);
      const products = linkAmounts(data.products);
      const duration = asSeconds(data.duration);
      const producedIn = new Set(
        data.producedIn.map((id) => machines.get(id) ?? null).filter(isNotNull),
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
          name,
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
