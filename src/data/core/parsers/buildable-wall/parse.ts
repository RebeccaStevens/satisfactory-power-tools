import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import { parseClasses, parseNumber, parseWallType } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mWidth"));
  assert(Object.hasOwn(data, "mHeight"));
  assert(Object.hasOwn(data, "mElevation"));
  assert(Object.hasOwn(data, "mAngularDepth"));
  assert(Object.hasOwn(data, "mWallType"));
  assert(Object.hasOwn(data, "mAngledVariants"));

  return {
    ...buildable,
    mWidth: parseNumber(data.mWidth),
    mHeight: parseNumber(data.mHeight),
    mElevation: parseNumber(data.mElevation),
    mAngularDepth: parseNumber(data.mAngularDepth),
    mWallType: parseWallType(data.mWallType),
    mAngledVariants: parseClasses(data.mAngledVariants),
  };
}
