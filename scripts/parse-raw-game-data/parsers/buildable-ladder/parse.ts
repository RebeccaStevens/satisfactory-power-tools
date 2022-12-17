import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mWidth"));
  assert(Object.hasOwn(data, "mMeshHeight"));
  assert(Object.hasOwn(data, "mMaxSegmentCount"));
  assert(Object.hasOwn(data, "mNumSegments"));

  return {
    ...buildable,
    mWidth: parseNumber(data.mWidth),
    mMeshHeight: parseNumber(data.mMeshHeight),
    mMaxSegmentCount: parseNumber(data.mMaxSegmentCount),
    mNumSegments: parseNumber(data.mNumSegments),
  };
}
