import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/parsers";
import {
  parseSpline,
  parseClasses,
  parseNumber,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mCustomSkins"));
  assert(Object.hasOwn(data, "mMeshLength"));
  assert(Object.hasOwn(data, "mSplineData"));
  assert(Object.hasOwn(data, "mSpeed"));
  assert(Object.hasOwn(data, "mItems"));

  return {
    ...buildable,
    mCustomSkins: parseClasses(data.mCustomSkins),
    mMeshLength: parseNumber(data.mMeshLength),
    mSplineData: parseSpline(data.mSplineData),
    mSpeed: parseNumber(data.mSpeed),
    mItems: parseClasses(data.mItems),
  };
}
