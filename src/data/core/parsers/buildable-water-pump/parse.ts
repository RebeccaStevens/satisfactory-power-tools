import assert from "node:assert/strict";

import { parseBuildableResourceExtractor } from "~/data/core/parsers";
import { parseNumber, parsePoint3D } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const extractor = parseBuildableResourceExtractor(data);

  assert(Object.hasOwn(data, "mMinimumDepthForPlacement"));
  assert(Object.hasOwn(data, "mDepthTraceOriginOffset"));

  return {
    ...extractor,
    mMinimumDepthForPlacement: parseNumber(data.mMinimumDepthForPlacement),
    mDepthTraceOriginOffset: parsePoint3D(data.mDepthTraceOriginOffset),
  };
}
