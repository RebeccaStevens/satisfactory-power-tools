import assert from "node:assert/strict";

import {
  parseString,
  parseBoolean,
  parseNumber,
  parseNullableString,
  parseSubCategories,
  parseAmounts,
  parseSchematicType,
  parseClasses,
  parseGamePhase,
} from "~/data/core/utils";
import { isObject } from "~/utils/object";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));
  assert(Object.hasOwn(data, "ClassName"));
  assert(Object.hasOwn(data, "mType"));
  assert(Object.hasOwn(data, "mDisplayName"));
  assert(Object.hasOwn(data, "mDescription"));
  assert(Object.hasOwn(data, "mSubCategories"));
  assert(Object.hasOwn(data, "mMenuPriority"));
  assert(Object.hasOwn(data, "mTechTier"));
  assert(Object.hasOwn(data, "mCost"));
  assert(Object.hasOwn(data, "mTimeToComplete"));
  assert(Object.hasOwn(data, "mRelevantShopSchematics"));
  assert(Object.hasOwn(data, "mUnlocks"));
  assert(Object.hasOwn(data, "mSchematicIcon"));
  assert(Object.hasOwn(data, "mSmallSchematicIcon"));
  assert(Object.hasOwn(data, "mSchematicDependencies"));
  assert(Object.hasOwn(data, "mDependenciesBlocksSchematicAccess"));
  assert(Object.hasOwn(data, "mHiddenUntilDependenciesMet"));

  return {
    ClassName: parseString(data.ClassName),
    mType: parseSchematicType(data.mType),
    mDisplayName: parseString(data.mDisplayName),
    mDescription: parseString(data.mDescription),
    mSubCategories: parseSubCategories(data.mSubCategories),
    mMenuPriority: parseNumber(data.mMenuPriority),
    mTechTier: parseNumber(data.mTechTier),
    mCost: parseAmounts(data.mCost),
    mTimeToComplete: parseNumber(data.mTimeToComplete),
    mRelevantShopSchematics: parseClasses(data.mRelevantShopSchematics),
    mUnlocks: parseUnlocks(data.mUnlocks),
    mSchematicIcon: parseString(data.mSchematicIcon),
    mSmallSchematicIcon: parseNullableString(data.mSmallSchematicIcon),
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
  return new Set(
    data.map((value) => {
      assert(isObject(value));
      assert(Object.hasOwn(value, "Class"));

      // assert(typeof value.mScannableObjects === "string");
      // const scannableObjects = parseRawCollection(value.mScannableObjects);
      // assert(scannableObjects instanceof Set);

      return {
        Class: parseString(value.Class),
        // mScannableObjects: new Set(
        //   scannableObjects.values().map((rawScannables) => {
        //     const scannables = parseRawCollection(rawScannables);
        //     assert(scannables instanceof Map);

        //     const descriptor = scannables.get("ItemDescriptor");
        //     assert(descriptor !== undefined);

        //     const rawActors = scannables.get("ActorsAllowedToScan");
        //     assert(rawActors !== undefined);

        //     const actors = parseRawCollection(rawActors);
        //     assert(actors instanceof Set);

        //     return {
        //       ItemDescriptor: parseString(descriptor),
        //       ActorsAllowedToScan: actors,
        //     };
        //   }),
        // ),
      };
    }),
  );
}

function parseSchematicDependencies(data: unknown) {
  assert(Array.isArray(data));
  return new Set(
    data.map((value) => {
      assert(isObject(value));
      assert(Object.hasOwn(value, "Class"));

      if (Object.hasOwn(value, "mGamePhase")) {
        return {
          Class: parseString(value.Class),
          mGamePhase: parseGamePhase(value.mGamePhase),
        };
      }

      assert(Object.hasOwn(value, "mSchematics"));
      assert(Object.hasOwn(value, "mRequireAllSchematicsToBePurchased"));

      return {
        Class: parseString(value.Class),
        mSchematics: parseClasses(value.mSchematics),
        mRequireAllSchematicsToBePurchased: parseBoolean(
          value.mRequireAllSchematicsToBePurchased,
        ),
      };
    }),
  );
}
