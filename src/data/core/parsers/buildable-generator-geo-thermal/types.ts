import type { BuildableBuilding } from "~/data/core/parsers";

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
