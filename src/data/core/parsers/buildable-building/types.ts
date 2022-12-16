import type { Buildable } from "~/data/core/parsers";
import type { StackSize } from "~/data/core/types";

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
