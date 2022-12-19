import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseClasses,
  parseNumber,
  parseWallType,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  assert(isObject(data));

  const buildable = parseBuildable(data);

  assert("mWidth" in data);
  assert("mHeight" in data);
  assert("mElevation" in data);
  assert("mAngularDepth" in data);
  assert("mWallType" in data);
  assert("mAngledVariants" in data);

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
