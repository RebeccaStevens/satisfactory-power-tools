import {
  type Item,
  type Machine,
  type QuantityPerMinute,
  type Seconds,
  type Quantity,
  type VariablePowerConsumptionConstant,
  type VariablePowerConsumptionFactor,
  type GeneralItem,
  type Idable,
} from "~/data/types";

export type Recipe = Idable & {
  id: string;
  ingredients: Map<GeneralItem, Quantity>;
  products: Map<GeneralItem, Quantity>;
  duration: Seconds;
  producedIn: Set<Idable>;
  variablePowerConsumptionConstant: VariablePowerConsumptionConstant;
  variablePowerConsumptionFactor: VariablePowerConsumptionFactor;
};

export type AppliedRecipe = Idable & {
  inputOutput: Map<Item, QuantityPerMinute>;
  producedIn: Machine;
  recipe: Recipe | null;
};
