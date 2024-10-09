import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableFactory(
  data: unknown,
): asserts data is VendorFGBuildableFactory {
  assertVendorFGBuildable(data);
  assert.isEmpty(
    [
      "mPowerConsumption",
      "mPowerConsumptionExponent",
      "mProductionBoostPowerConsumptionExponent",
      "mDoesHaveShutdownAnimation",
      "mOnHasPowerChanged",
      "mOnHasProductionChanged",
      "mOnHasStandbyChanged",
      "mOnPendingPotentialChanged",
      "mOnPendingProductionBoostChanged",
      "mOnCurrentProductivityChanged",
      "mMinimumProducingTime",
      "mMinimumStoppedTime",
      "mCanEverMonitorProductivity",
      "mCanChangePotential",
      "mCanChangeProductionBoost",
      "mMinPotential",
      "mMaxPotential",
      "mBaseProductionBoost",
      "mPotentialShardSlots",
      "mProductionShardSlotSize",
      "mProductionShardBoostMultiplier",
      "mFluidStackSizeDefault",
      "mFluidStackSizeMultiplier",
      "mHasInventoryPotential",
      "mIsTickRateManaged",
      "mEffectUpdateInterval",
      "mDefaultProductivityMeasurementDuration",
      "mLastProductivityMeasurementProduceDuration",
      "mLastProductivityMeasurementDuration",
      "mCurrentProductivityMeasurementProduceDuration",
      "mCurrentProductivityMeasurementDuration",
      "mProductivityMonitorEnabled",
      "mOverridePotentialShardSlots",
      "mOverrideProductionShardSlotSize",
      "mAddToSignificanceManager",
      "mAlienOverClockingParticleEffects",
      "mCachedSkeletalMeshes",
      "mSignificanceRange",
      "mTickExponent",
    ].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGBuildableFactory",
  );
}

export type VendorFGBuildableFactory = VendorFGBuildable & {
  JumpForceCharacter?: string;
  JumpForcePhysics?: string;
  mPowerConsumption: string;
  mPowerConsumptionExponent: string;
  mProductionBoostPowerConsumptionExponent: string;
  mDoesHaveShutdownAnimation: string;
  mOnHasPowerChanged: string;
  mOnHasProductionChanged: string;
  mOnHasStandbyChanged: string;
  mOnPendingPotentialChanged: string;
  mOnPendingProductionBoostChanged: string;
  mOnCurrentProductivityChanged: string;
  mMinimumProducingTime: string;
  mMinimumStoppedTime: string;
  mCanEverMonitorProductivity: string;
  mCanChangePotential: string;
  mCanChangeProductionBoost: string;
  mMinPotential: string;
  mMaxPotential: string;
  mBaseProductionBoost: string;
  mPotentialShardSlots: string;
  mProductionShardSlotSize: string;
  mProductionShardBoostMultiplier: string;
  mFluidStackSizeDefault: string;
  mFluidStackSizeMultiplier: string;
  mHasInventoryPotential: string;
  mIsTickRateManaged: string;
  mEffectUpdateInterval: string;
  mDefaultProductivityMeasurementDuration: string;
  mLastProductivityMeasurementProduceDuration: string;
  mLastProductivityMeasurementDuration: string;
  mCurrentProductivityMeasurementProduceDuration: string;
  mCurrentProductivityMeasurementDuration: string;
  mProductivityMonitorEnabled: string;
  mOverridePotentialShardSlots: string;
  mOverrideProductionShardSlotSize: string;
  mAddToSignificanceManager: string;
  mAlienOverClockingParticleEffects: string;
  mCachedSkeletalMeshes: string;
  mSignificanceRange: string;
  mTickExponent: string;
};
