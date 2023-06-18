import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildableResourceExtractor } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber, parsePoint3D } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const extractor = parseBuildableResourceExtractor(data);

  assertPropertyExists(data, "mMinimumDepthForPlacement");
  assertPropertyExists(data, "mDepthTraceOriginOffset");

  return {
    ...extractor,
    mMinimumDepthForPlacement: parseNumber(data.mMinimumDepthForPlacement),
    mDepthTraceOriginOffset: parsePoint3D(data.mDepthTraceOriginOffset),
  };
}
