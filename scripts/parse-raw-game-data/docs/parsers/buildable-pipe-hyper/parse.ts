import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parsePoint3D,
  parseSpline,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  // assertPropExists(data, "mExitOffset");
  assertPropertyExists(data, "mMeshLength");
  assertPropertyExists(data, "mSplineData");

  return {
    ...buildable,
    // mExitOffset: parsePoint3D(data.mExitOffset),
    mMeshLength: parseNumber(data.mMeshLength),
    mSplineData: parseSpline(data.mSplineData),
  };
}
