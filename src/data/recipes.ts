import type RawGameData from "~/data/game-data.json";
import {
  type ItemQuantity,
  type FluidQuantity,
  type Seconds,
  type GeneralItem,
  type Idable,
  type Recipe,
  belt,
} from "~/data/types";
import {
  asVariablePowerConsumptionConstant,
  asVariablePowerConsumptionFactor,
} from "~/data/types";
import { isNotNull } from "~/utils";

export function getRecipes(
  rawRecipes: Readonly<(typeof RawGameData)["recipes"]>,
  items: ReadonlyMap<string, GeneralItem>,
  producers: ReadonlyMap<string, Idable>,
) {
  function linkAmounts(data: Record<string, number>) {
    return new Map(
      Object.entries(data)
        .map(([id, amount]) => {
          const item = items.get(id);
          if (item === undefined) {
            return null;
          }
          const quantity =
            item.transporter === belt
              ? (amount as ItemQuantity)
              : ((amount / 1000) as FluidQuantity);
          return [item, quantity] as const;
        })
        .filter(isNotNull),
    );
  }

  return new Map(
    Object.entries(rawRecipes).map(([id, data]): [string, Recipe] => {
      const ingredients = linkAmounts(data.ingredients);
      const products = linkAmounts(data.products);
      const duration = data.duration as Seconds;
      const producedIn = new Set(
        data.producedIn
          .map((producerId) => producers.get(producerId) ?? null)
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
        reactive({
          id,
          ingredients,
          products,
          duration,
          producedIn,
          variablePowerConsumptionConstant,
          variablePowerConsumptionFactor,
        }),
      ];
    }),
  );
}
