import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseBoolean,
  parseClasses,
  parseNullableString,
  parseResourceForms,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableBuilding = parseBuildableBuilding(data);

  assert(Object.hasOwn(data, "mAllowedResourceForms"));
  assert(Object.hasOwn(data, "mOnlyAllowCertainResources"));
  assert(Object.hasOwn(data, "mAllowedResources"));
  assert(Object.hasOwn(data, "mExtractorTypeName"));
  assert(Object.hasOwn(data, "mTryFindMissingResource"));

  return {
    ...buildableBuilding,
    mAllowedResourceForms: parseResourceForms(data.mAllowedResourceForms),
    mOnlyAllowCertainResources: parseBoolean(data.mOnlyAllowCertainResources),
    mAllowedResources: parseClasses(data.mAllowedResources),
    mExtractorTypeName: parseNullableString(data.mExtractorTypeName),
    mTryFindMissingResource: parseBoolean(data.mTryFindMissingResource),
  };
}
