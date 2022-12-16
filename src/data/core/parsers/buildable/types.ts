import type {
  AttachmentPoint,
  CustomScaleType,
  Material,
  OcclusionBoxInfo,
  OcclusionShape,
  Vector3D,
} from "~/data/core/types";

export type Data = {
  ClassName: string;
  mDisplayName: string;
  mDescription: string;
  mHighlightVector: Vector3D;
  mAlternativeMaterialRecipes: Set<Material["id"]>;
  mContainsComponents: boolean;
  mBuildEffectSpeed: number;
  mAllowColoring: boolean;
  mAllowPatterning: boolean;
  mSkipBuildEffect: boolean;
  mForceNetUpdateOnRegisterPlayer: boolean;
  mToggleDormancyOnInteraction: boolean;
  mIsMultiSpawnedBuildable: boolean;
  mShouldShowHighlight: boolean;
  mShouldShowAttachmentPointVisuals: boolean;
  mCreateClearanceMeshRepresentation: boolean;
  mCanContainLightweightInstances: boolean;
  mAffectsOcclusion: boolean;
  mOcclusionShape: OcclusionShape;
  mScaleCustomOffset: number;
  mCustomScaleType: CustomScaleType;
  mOcclusionBoxInfo: Set<OcclusionBoxInfo>;
  mAttachmentPoints: Set<AttachmentPoint>;
  mIsUseable: boolean;
  mHideOnBuildEffectStart: boolean;
  mShouldModifyWorldGrid: boolean;
  mBlueprintBuildEffectID: number | false;
};
