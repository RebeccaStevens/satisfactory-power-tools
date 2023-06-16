import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseBoolean, parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assert("mSize" in data);
  assert("mHeight" in data);
  assert("mIsInverted" in data);

  return {
    ...buildable,
    mSize: parseNumber(data.mSize),
    mHeight: parseNumber(data.mHeight),
    mIsInverted: parseBoolean(data.mIsInverted),
  };
}
