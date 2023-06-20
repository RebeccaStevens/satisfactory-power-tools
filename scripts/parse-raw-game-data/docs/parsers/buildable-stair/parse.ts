import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseStairDirection,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mStairDirection");
  assertPropertyExists(data, "mHeight");
  assertPropertyExists(data, "mSize");

  return {
    ...buildable,
    mStairDirection: parseStairDirection(data.mStairDirection),
    mHeight: parseNumber(data.mHeight),
    mSize: parseNumber(data.mSize),
  };
}
