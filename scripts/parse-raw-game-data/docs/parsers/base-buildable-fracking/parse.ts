import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseBoolean,
  parseClasses,
  parseNullableString,
  parseResourceForms,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assertPropertyExists(data, "mAllowedResourceForms");
  assertPropertyExists(data, "mOnlyAllowCertainResources");
  assertPropertyExists(data, "mAllowedResources");
  assertPropertyExists(data, "mExtractorTypeName");
  assertPropertyExists(data, "mTryFindMissingResource");

  return {
    ...buildableBuilding,
    mAllowedResourceForms: parseResourceForms(data.mAllowedResourceForms),
    mOnlyAllowCertainResources: parseBoolean(data.mOnlyAllowCertainResources),
    mAllowedResources: parseClasses(data.mAllowedResources),
    mExtractorTypeName: parseNullableString(data.mExtractorTypeName),
    mTryFindMissingResource: parseBoolean(data.mTryFindMissingResource),
  };
}
