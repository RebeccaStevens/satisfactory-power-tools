import assert from "node:assert/strict";

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

  assert("mCustomSkins" in data);
  assert("mMeshLength" in data);
  assert("mSplineData" in data);
  assert("mSpeed" in data);
  assert("mItems" in data);

  return {
    ...buildable,
    mCustomSkins: parseClasses(data.mCustomSkins),
    mMeshLength: parseNumber(data.mMeshLength),
    mSplineData: parseSpline(data.mSplineData),
    mSpeed: parseNumber(data.mSpeed),
    mItems: parseClasses(data.mItems),
  };
}
