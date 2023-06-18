import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mWidth");
  assertPropertyExists(data, "mMeshHeight");
  assertPropertyExists(data, "mMaxSegmentCount");
  assertPropertyExists(data, "mNumSegments");

  return {
    ...buildable,
    mWidth: parseNumber(data.mWidth),
    mMeshHeight: parseNumber(data.mMeshHeight),
    mMaxSegmentCount: parseNumber(data.mMaxSegmentCount),
    mNumSegments: parseNumber(data.mNumSegments),
  };
}
