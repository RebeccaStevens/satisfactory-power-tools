import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseBoolean,
  parseDirectionBooleanMap,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mWidth");
  assertPropertyExists(data, "mDepth");
  assertPropertyExists(data, "mHeight");
  assertPropertyExists(data, "mElevation");
  assertPropertyExists(data, "mIsFrame");
  assertPropertyExists(data, "mDisableSnapOn");

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
