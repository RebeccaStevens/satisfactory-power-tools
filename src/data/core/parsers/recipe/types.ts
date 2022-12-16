import type { GameEvent } from "~/data/core/types";

export type Data = {
  ClassName: string;
  mDisplayName: string;
  mIngredients: Map<string, number>;
  mProduct: Map<string, number>;
  mManufacturingMenuPriority: number;
  mManufactoringDuration: number;
  mManualManufacturingMultiplier: number;
  mProducedIn: Set<string>;
  mRelevantEvents: Set<GameEvent>;
  mVariablePowerConsumptionConstant: number;
  mVariablePowerConsumptionFactor: number;
};
