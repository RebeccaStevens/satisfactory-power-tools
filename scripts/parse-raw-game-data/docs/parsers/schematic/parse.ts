import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
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

  assertPropertyExists(data, "mType");
  assertPropertyExists(data, "mDescription");
  assertPropertyExists(data, "mSubCategories");
  assertPropertyExists(data, "mMenuPriority");
  assertPropertyExists(data, "mTechTier");
  assertPropertyExists(data, "mCost");
  assertPropertyExists(data, "mTimeToComplete");
  assertPropertyExists(data, "mRelevantShopSchematics");
  assertPropertyExists(data, "mUnlocks", "array");
  assertPropertyExists(data, "mSchematicIcon");
  assertPropertyExists(data, "mSmallSchematicIcon");
  assertPropertyExists(data, "mSchematicDependencies", "array");
  assertPropertyExists(data, "mDependenciesBlocksSchematicAccess");
  assertPropertyExists(data, "mHiddenUntilDependenciesMet");

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
function parseUnlocks(data: unknown[]) {
  return data.map((value) => {
    assert(isObject(value));
    assertPropertyExists(value, "Class");
    return {
      Class: parseString(value.Class),
    };
  });
}

function parseSchematicDependencies(data: unknown[]) {
  return data.map((value) => {
    assert(isObject(value));
    assertPropertyExists(value, "Class");

    if ("mGamePhase" in value) {
      assertPropertyExists(value, "mGamePhase");
      return {
        Class: parseString(value.Class),
        mGamePhase: parseGamePhase(value.mGamePhase),
      };
    }

    assertPropertyExists(value, "mSchematics");
    assertPropertyExists(value, "mRequireAllSchematicsToBePurchased");

    return {
      Class: parseString(value.Class),
      mSchematics: parseClasses(value.mSchematics),
      mRequireAllSchematicsToBePurchased: parseBoolean(
        value.mRequireAllSchematicsToBePurchased,
      ),
    };
  });
}
