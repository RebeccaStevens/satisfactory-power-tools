import type { BuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";

export type Data = BuildableBuilding & {
  mProductionEffectsRunning: boolean;
  mVariablePowerProductionConstant: number;
  mVariablePowerProductionFactor: number;
  mVariablePowerProductionCycleLength: number;
  mMinPowerProduction: number;
  mMaxPowerProduction: number;
  mVariablePowerProductionCycleOffset: number;
  mPowerProduction: number;
  mLoadPercentage: number;
};
