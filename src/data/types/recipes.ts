import type {
  Seconds,
  Quantity,
  VariablePowerConsumptionConstant,
  VariablePowerConsumptionFactor,
  Item,
} from "~/data/types";
import type { Machine } from "~/data/types/machines";

export type Recipe = {
  id: string;
  ingredients: Map<Item, Quantity>;
  products: Map<Item, Quantity>;
  duration: Seconds;
  producedIn: Set<Machine>;
  variablePowerConsumptionConstant: VariablePowerConsumptionConstant;
  variablePowerConsumptionFactor: VariablePowerConsumptionFactor;
};
