import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import {
  parseNumber,
  parseBoolean,
  parseDirectionBooleanMap,
} from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mWidth"));
  assert(Object.hasOwn(data, "mDepth"));
  assert(Object.hasOwn(data, "mHeight"));
  assert(Object.hasOwn(data, "mElevation"));
  assert(Object.hasOwn(data, "mIsFrame"));
  assert(Object.hasOwn(data, "mDisableSnapOn"));

  return {
    ...buildable,
    mWidth: parseNumber(data.mWidth),
    mDepth: parseNumber(data.mDepth),
    mHeight: parseNumber(data.mHeight),
    mElevation: parseNumber(data.mElevation),
    mIsFrame: parseBoolean(data.mIsFrame),
    mDisableSnapOn: parseDirectionBooleanMap(data.mDisableSnapOn),
  };
}
