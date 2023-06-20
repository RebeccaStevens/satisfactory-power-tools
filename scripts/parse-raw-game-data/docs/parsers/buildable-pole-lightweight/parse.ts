import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseBoolean,
  parseNumber,
  parseFalsableNumber,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mHeight");
  assertPropertyExists(data, "mSelectedPoleVersion");
  assertPropertyExists(data, "mUseStaticHeight");
  assertPropertyExists(data, "mCanStack");
  assertPropertyExists(data, "mStackHeight");

  return {
    ...buildable,
    mHeight: parseNumber(data.mHeight),
    mSelectedPoleVersion: parseFalsableNumber(data.mSelectedPoleVersion),
    mUseStaticHeight: parseBoolean(data.mUseStaticHeight),
    mCanStack: parseBoolean(data.mCanStack),
    mStackHeight: parseNumber(data.mStackHeight),
  };
}
