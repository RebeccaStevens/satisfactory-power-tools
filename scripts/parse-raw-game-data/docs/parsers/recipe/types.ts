import { type Base } from "~/scripts/parse-raw-game-data/docs/parsers";
import { type GameEvent } from "~/scripts/parse-raw-game-data/types";

export type Data = Base & {
  mIngredients: Record<string, number>;
  mProduct: Record<string, number>;
  mManufacturingMenuPriority: number;
  mManufactoringDuration: number;
  mManualManufacturingMultiplier: number;
  mProducedIn: string[];
  mRelevantEvents: GameEvent[];
  mVariablePowerConsumptionConstant: number;
  mVariablePowerConsumptionFactor: number;
};
