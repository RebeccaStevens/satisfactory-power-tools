import {
  type Machine,
  type QuantityPerMinute,
  type MegaWatts,
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
  inputOutput: Map<GeneralItem, QuantityPerMinute>;
  powerDifferential: MegaWatts;
  producedIn: Machine;
  recipe: Recipe;
};
