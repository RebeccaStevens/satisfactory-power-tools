import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import { parseNumber, parsePoint3D, parseSpline } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mExitOffset"));
  assert(Object.hasOwn(data, "mMeshLength"));
  assert(Object.hasOwn(data, "mSplineData"));

  return {
    ...buildable,
    mExitOffset: parsePoint3D(data.mExitOffset),
    mMeshLength: parseNumber(data.mMeshLength),
    mSplineData: parseSpline(data.mSplineData),
  };
}
