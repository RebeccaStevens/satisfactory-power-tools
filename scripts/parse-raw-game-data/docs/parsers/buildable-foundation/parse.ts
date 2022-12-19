import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseBoolean,
  parseDirectionBooleanMap,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assert("mWidth" in data);
  assert("mDepth" in data);
  assert("mHeight" in data);
  assert("mElevation" in data);
  assert("mIsFrame" in data);
  assert("mDisableSnapOn" in data);

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
