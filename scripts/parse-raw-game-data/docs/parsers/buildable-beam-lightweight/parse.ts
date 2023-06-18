import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mSize");
  assertPropertyExists(data, "mDefaultLength");
  assertPropertyExists(data, "mMaxLength");
  assertPropertyExists(data, "mLength");

  return {
    ...buildable,
    mSize: parseNumber(data.mSize),
    mDefaultLength: parseNumber(data.mDefaultLength),
    mMaxLength: parseNumber(data.mMaxLength),
    mLength: parseNumber(data.mLength),
  };
}
