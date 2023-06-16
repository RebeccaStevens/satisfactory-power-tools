import { type Buildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { type StackSize } from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mPowerConsumption: number;
  mPowerConsumptionExponent: number;
  mDoesHaveShutdownAnimation: boolean;
  mMinimumProducingTime: number;
  mMinimumStoppedTime: number;
  mCanEverMonitorProductivity: boolean;
  mCanChangePotential: boolean;
  mMinPotential: number;
  mMaxPotential: number;
  mMaxPotentialIncreasePerCrystal: number;
  mFluidStackSizeDefault: StackSize;
  mFluidStackSizeMultiplier: number;
  mEffectUpdateInterval: number;
  mAddToSignificanceManager: boolean;
  mSignificanceRange: number;
};
