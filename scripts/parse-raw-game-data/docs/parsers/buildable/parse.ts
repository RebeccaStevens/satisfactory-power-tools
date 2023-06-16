import assert from "node:assert/strict";

import { parseBase } from "~/scripts/parse-raw-game-data/docs/parsers";
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
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const base = parseBase(data);

  assert("mDescription" in data);
  assert("mHighlightVector" in data);
  assert("mAlternativeMaterialRecipes" in data);
  assert("mContainsComponents" in data);
  assert("mBuildEffectSpeed" in data);
  assert("mAllowColoring" in data);
  assert("mAllowPatterning" in data);
  assert("mSkipBuildEffect" in data);
  assert("mForceNetUpdateOnRegisterPlayer" in data);
  assert("mToggleDormancyOnInteraction" in data);
  assert("mIsMultiSpawnedBuildable" in data);
  assert("mShouldShowHighlight" in data);
  assert("mShouldShowAttachmentPointVisuals" in data);
  assert("mCreateClearanceMeshRepresentation" in data);
  assert("mCanContainLightweightInstances" in data);
  assert("mAffectsOcclusion" in data);
  assert("mOcclusionShape" in data);
  assert("mScaleCustomOffset" in data);
  assert("mCustomScaleType" in data);
  assert("mOcclusionBoxInfo" in data);
  assert("mAttachmentPoints" in data);
  assert("mIsUseable" in data);
  assert("mHideOnBuildEffectStart" in data);
  assert("mShouldModifyWorldGrid" in data);
  assert("mBlueprintBuildEffectID" in data);

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
