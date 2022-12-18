import type {
  Id,
  Name,
  Seconds,
  Quantity,
  VariablePowerConsumptionConstant,
  VariablePowerConsumptionFactor,
  Item,
} from "~/data/types";
import type { Machine } from "~/data/types/machines";

export type Recipe = {
  id: Id;
  name: Name;
  ingredients: Map<Item, Quantity>;
  products: Map<Item, Quantity>;
  duration: Seconds;
  producedIn: Set<Machine>;
  variablePowerConsumptionConstant: VariablePowerConsumptionConstant;
  variablePowerConsumptionFactor: VariablePowerConsumptionFactor;
};
