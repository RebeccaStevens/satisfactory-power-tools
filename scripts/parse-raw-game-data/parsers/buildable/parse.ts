import assert from "node:assert/strict";

import { parseBase } from "~/scripts/parse-raw-game-data/parsers";
import {
  parseAttachmentPoints,
  parseBoolean,
  parseCustomScaleType,
  parseFalsableNumber,
  parseMaterials,
  parseNumber,
  parseOcclusionBoxInfo,
  parseOcclusionShape,
  parseString,
  parseVector3D,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const base = parseBase(data);

  assert(Object.hasOwn(data, "mDescription"));
  assert(Object.hasOwn(data, "mHighlightVector"));
  assert(Object.hasOwn(data, "mAlternativeMaterialRecipes"));
  assert(Object.hasOwn(data, "mContainsComponents"));
  assert(Object.hasOwn(data, "mBuildEffectSpeed"));
  assert(Object.hasOwn(data, "mAllowColoring"));
  assert(Object.hasOwn(data, "mAllowPatterning"));
  assert(Object.hasOwn(data, "mSkipBuildEffect"));
  assert(Object.hasOwn(data, "mForceNetUpdateOnRegisterPlayer"));
  assert(Object.hasOwn(data, "mToggleDormancyOnInteraction"));
  assert(Object.hasOwn(data, "mIsMultiSpawnedBuildable"));
  assert(Object.hasOwn(data, "mShouldShowHighlight"));
  assert(Object.hasOwn(data, "mShouldShowAttachmentPointVisuals"));
  assert(Object.hasOwn(data, "mCreateClearanceMeshRepresentation"));
  assert(Object.hasOwn(data, "mCanContainLightweightInstances"));
  assert(Object.hasOwn(data, "mAffectsOcclusion"));
  assert(Object.hasOwn(data, "mOcclusionShape"));
  assert(Object.hasOwn(data, "mScaleCustomOffset"));
  assert(Object.hasOwn(data, "mCustomScaleType"));
  assert(Object.hasOwn(data, "mOcclusionBoxInfo"));
  assert(Object.hasOwn(data, "mAttachmentPoints"));
  assert(Object.hasOwn(data, "mIsUseable"));
  assert(Object.hasOwn(data, "mHideOnBuildEffectStart"));
  assert(Object.hasOwn(data, "mShouldModifyWorldGrid"));
  assert(Object.hasOwn(data, "mBlueprintBuildEffectID"));

  return {
    ...base,
    mDescription: parseString(data.mDescription),
    mHighlightVector: parseVector3D(data.mHighlightVector),
    mAlternativeMaterialRecipes: parseMaterials(
      data.mAlternativeMaterialRecipes,
    ),
    mContainsComponents: parseBoolean(data.mContainsComponents),
    mBuildEffectSpeed: parseNumber(data.mBuildEffectSpeed),
    mAllowColoring: parseBoolean(data.mAllowColoring),
    mAllowPatterning: parseBoolean(data.mAllowPatterning),
    mSkipBuildEffect: parseBoolean(data.mSkipBuildEffect),
    mForceNetUpdateOnRegisterPlayer: parseBoolean(
      data.mForceNetUpdateOnRegisterPlayer,
    ),
    mToggleDormancyOnInteraction: parseBoolean(
      data.mToggleDormancyOnInteraction,
    ),
    mIsMultiSpawnedBuildable: parseBoolean(data.mIsMultiSpawnedBuildable),
    mShouldShowHighlight: parseBoolean(data.mShouldShowHighlight),
    mShouldShowAttachmentPointVisuals: parseBoolean(
      data.mShouldShowAttachmentPointVisuals,
    ),
    mCreateClearanceMeshRepresentation: parseBoolean(
      data.mCreateClearanceMeshRepresentation,
    ),
    mCanContainLightweightInstances: parseBoolean(
      data.mCanContainLightweightInstances,
    ),
    mAffectsOcclusion: parseBoolean(data.mAffectsOcclusion),
    mOcclusionShape: parseOcclusionShape(data.mOcclusionShape),
    mScaleCustomOffset: parseNumber(data.mScaleCustomOffset),
    mCustomScaleType: parseCustomScaleType(data.mCustomScaleType),
    mOcclusionBoxInfo: parseOcclusionBoxInfo(data.mOcclusionBoxInfo),
    mAttachmentPoints: parseAttachmentPoints(data.mAttachmentPoints),
    mIsUseable: parseBoolean(data.mIsUseable),
    mHideOnBuildEffectStart: parseBoolean(data.mHideOnBuildEffectStart),
    mShouldModifyWorldGrid: parseBoolean(data.mShouldModifyWorldGrid),
    mBlueprintBuildEffectID: parseFalsableNumber(data.mBlueprintBuildEffectID),
  };
}
