import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
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
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const base = parseBase(data);

  assertPropertyExists(data, "mDescription");
  assertPropertyExists(data, "mAlternativeMaterialRecipes");
  assertPropertyExists(data, "mContainsComponents");
  assertPropertyExists(data, "mBuildEffectSpeed");
  assertPropertyExists(data, "mAllowColoring");
  assertPropertyExists(data, "mAllowPatterning");
  assertPropertyExists(data, "mSkipBuildEffect");
  assertPropertyExists(data, "mForceNetUpdateOnRegisterPlayer");
  assertPropertyExists(data, "mToggleDormancyOnInteraction");
  assertPropertyExists(data, "mIsMultiSpawnedBuildable");
  assertPropertyExists(data, "mShouldShowAttachmentPointVisuals");
  assertPropertyExists(data, "mCreateClearanceMeshRepresentation");
  assertPropertyExists(data, "mCanContainLightweightInstances");
  assertPropertyExists(data, "mAffectsOcclusion");
  assertPropertyExists(data, "mOcclusionShape");
  assertPropertyExists(data, "mScaleCustomOffset");
  assertPropertyExists(data, "mCustomScaleType");
  assertPropertyExists(data, "mOcclusionBoxInfo");
  assertPropertyExists(data, "mAttachmentPoints");
  assertPropertyExists(data, "mIsUseable");
  assertPropertyExists(data, "mHideOnBuildEffectStart");
  assertPropertyExists(data, "mShouldModifyWorldGrid");
  assertPropertyExists(data, "mBlueprintBuildEffectID");

  return {
    ...base,
    mDescription: parseString(data.mDescription),
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
