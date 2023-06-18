import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseClasses,
  parseNumber,
  parseWallType,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mWidth");
  assertPropertyExists(data, "mHeight");
  assertPropertyExists(data, "mElevation");
  assertPropertyExists(data, "mAngularDepth");
  assertPropertyExists(data, "mWallType");
  assertPropertyExists(data, "mAngledVariants");

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
