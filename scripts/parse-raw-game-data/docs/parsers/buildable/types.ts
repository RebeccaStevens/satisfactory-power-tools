import type { Base } from "~/scripts/parse-raw-game-data/docs/parsers";
import type {
  AttachmentPoint,
  CustomScaleType,
  Material,
  OcclusionBoxInfo,
  OcclusionShape,
  Vector3D,
} from "~/scripts/parse-raw-game-data/types";

export type Data = Base & {
  mDescription: string;
  mHighlightVector: Vector3D;
  mAlternativeMaterialRecipes: Material[];
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
  mOcclusionBoxInfo: OcclusionBoxInfo[];
  mAttachmentPoints: AttachmentPoint[];
  mIsUseable: boolean;
  mHideOnBuildEffectStart: boolean;
  mShouldModifyWorldGrid: boolean;
  mBlueprintBuildEffectID: number | false;
};
