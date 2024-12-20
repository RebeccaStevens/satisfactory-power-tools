import { assert } from "chai";

import type { FGBase } from "~/game-data/generate/parsers/abstract/FGBase";
import { assertVendorFGBase } from "~/game-data/generate/parsers/abstract/FGBase/assert";

export function assertVendorFGBuildable(data: unknown): asserts data is VendorFGBuildable {
  assertVendorFGBase(data);
  assert.isEmpty(
    [
      /* cspell:disable */
      "mDescription",
      "mAlternativeMaterialRecipes",
      "mContainsComponents",
      "mIsConsideredForBaseWeightValue",
      "bForceLegacyBuildEffect",
      "bForceBuildEffectSolo",
      "mBuildEffectSpeed",
      "mAllowColoring",
      "mAllowPatterning",
      "mInteractionRegisterPlayerWithCircuit",
      "mSkipBuildEffect",
      "mForceNetUpdateOnRegisterPlayer",
      "mToggleDormancyOnInteraction",
      "mIsMultiSpawnedBuildable",
      "mShouldShowAttachmentPointVisuals",
      "mCanContainLightweightInstances",
      "mManagedByLightweightBuildableSubsystem",
      "mRemoveBuildableFromSubsystemOnDismantle",
      "mHasBeenRemovedFromSubsystem",
      "mAffectsOcclusion",
      "mOcclusionShape",
      "mScaleCustomOffset",
      "mCustomScaleType",
      "mOcclusionBoxInfo",
      "mAttachmentPoints",
      "mReplicatedBuiltInsideBlueprintDesigner",
      "mInteractingPlayers",
      "mIsUseable",
      "mClearanceData",
      "mHideOnBuildEffectStart",
      "mShouldModifyWorldGrid",
      "mTimelapseBucketId",
      "mTimelapseDelay",
      "mAlienOverClockingZOffset",
      "mAlienOverClockingAttenuationScalingFactor",
      "mAlienOverClockingVolumeDB_RTPC",
      "mAlienOverClockingHighpass_RTPC",
      "mAlienOverClockingPitch_RTPC",
      "mBlueprintBuildEffectID",

      /* cspell:enable */
    ].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in FGBuildable",
  );
}

export type VendorFGBuildable = FGBase & {
  /* cspell:disable */
  MaxRenderDistance?: string;
  mDescription: string;
  mAlternativeMaterialRecipes: string;
  mContainsComponents: string;
  mIsConsideredForBaseWeightValue: string;
  bForceLegacyBuildEffect: string;
  bForceBuildEffectSolo: string;
  mBuildEffectSpeed: string;
  mAllowColoring: string;
  mAllowPatterning: string;
  mInteractionRegisterPlayerWithCircuit: string;
  mSkipBuildEffect: string;
  mForceNetUpdateOnRegisterPlayer: string;
  mToggleDormancyOnInteraction: string;
  mIsMultiSpawnedBuildable: string;
  mShouldShowAttachmentPointVisuals: string;
  mCanContainLightweightInstances: string;
  mManagedByLightweightBuildableSubsystem: string;
  mRemoveBuildableFromSubsystemOnDismantle: string;
  mHasBeenRemovedFromSubsystem: string;
  mAffectsOcclusion: string;
  mOcclusionShape: string;
  mScaleCustomOffset: string;
  mCustomScaleType: string;
  mOcclusionBoxInfo: string;
  mAttachmentPoints: string;
  mReplicatedBuiltInsideBlueprintDesigner: string;
  mInteractingPlayers: string;
  mIsUseable: string;
  mClearanceData: string;
  mHideOnBuildEffectStart: string;
  mShouldModifyWorldGrid: string;
  mTimelapseBucketId: string;
  mTimelapseDelay: string;
  mAlienOverClockingZOffset: string;
  mAlienOverClockingAttenuationScalingFactor: string;
  mAlienOverClockingVolumeDB_RTPC: string;
  mAlienOverClockingHighpass_RTPC: string;
  mAlienOverClockingPitch_RTPC: string;
  mBlueprintBuildEffectID: string;

  /* cspell:enable */
};
