import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseSpline,
  parseClasses,
  parseNumber,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mCustomSkins");
  assertPropertyExists(data, "mMeshLength");
  assertPropertyExists(data, "mSplineData");
  assertPropertyExists(data, "mSpeed");
  assertPropertyExists(data, "mItems");

  return {
    ...buildable,
    mCustomSkins: parseClasses(data.mCustomSkins),
    mMeshLength: parseNumber(data.mMeshLength),
    mSplineData: parseSpline(data.mSplineData),
    mSpeed: parseNumber(data.mSpeed),
    mItems: parseClasses(data.mItems),
  };
}
