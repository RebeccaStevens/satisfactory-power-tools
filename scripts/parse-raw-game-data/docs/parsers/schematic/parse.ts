import assert from "node:assert/strict";

import { parseBase } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseString,
  parseBoolean,
  parseNumber,
  parseSubCategories,
  parseAmounts,
  parseSchematicType,
  parseClasses,
  parseGamePhase,
  parseIcon,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils/object";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const base = parseBase(data);

  assert("mType" in data);
  assert("mDescription" in data);
  assert("mSubCategories" in data);
  assert("mMenuPriority" in data);
  assert("mTechTier" in data);
  assert("mCost" in data);
  assert("mTimeToComplete" in data);
  assert("mRelevantShopSchematics" in data);
  assert("mUnlocks" in data);
  assert("mSchematicIcon" in data);
  assert("mSmallSchematicIcon" in data);
  assert("mSchematicDependencies" in data);
  assert("mDependenciesBlocksSchematicAccess" in data);
  assert("mHiddenUntilDependenciesMet" in data);

  return {
    ...base,
    mType: parseSchematicType(data.mType),
    mDescription: parseString(data.mDescription),
    mSubCategories: parseSubCategories(data.mSubCategories),
    mMenuPriority: parseNumber(data.mMenuPriority),
    mTechTier: parseNumber(data.mTechTier),
    mCost: parseAmounts(data.mCost),
    mTimeToComplete: parseNumber(data.mTimeToComplete),
    mRelevantShopSchematics: parseClasses(data.mRelevantShopSchematics),
    mUnlocks: parseUnlocks(data.mUnlocks),
    mSchematicIcon: parseIcon(data.mSchematicIcon),
    mSmallSchematicIcon: parseIcon(data.mSmallSchematicIcon),
    mSchematicDependencies: parseSchematicDependencies(
      data.mSchematicDependencies,
    ),
    mDependenciesBlocksSchematicAccess: parseBoolean(
      data.mDependenciesBlocksSchematicAccess,
    ),
    mHiddenUntilDependenciesMet: parseBoolean(data.mHiddenUntilDependenciesMet),
  };
}

// TODO
function parseUnlocks(data: unknown) {
  assert(Array.isArray(data));
  return data.map((value) => {
    assert(isObject(value));
    assert("Class" in value);
    return {
      Class: parseString(value.Class),
    };
  });
}

function parseSchematicDependencies(data: unknown) {
  assert(Array.isArray(data));
  return data.map((value) => {
    assert(isObject(value));
    assert("Class" in value);

    if ("mGamePhase" in value) {
      return {
        Class: parseString(value.Class),
        mGamePhase: parseGamePhase(value.mGamePhase),
      };
    }

    assert("mSchematics" in value);
    assert("mRequireAllSchematicsToBePurchased" in value);

    return {
      Class: parseString(value.Class),
      mSchematics: parseClasses(value.mSchematics),
      mRequireAllSchematicsToBePurchased: parseBoolean(
        value.mRequireAllSchematicsToBePurchased,
      ),
    };
  });
}
