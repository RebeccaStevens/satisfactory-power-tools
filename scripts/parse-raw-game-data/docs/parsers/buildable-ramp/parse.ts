import assert from "node:assert/strict";

import { parseBuildableFoundation } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseBoolean } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildableFoundation(data);

  assert("mIsDoubleRamp" in data);
  assert("mIsRoof" in data);

  return {
    ...buildable,
    mIsDoubleRamp: parseBoolean(data.mIsDoubleRamp),
    mIsRoof: parseBoolean(data.mIsRoof),
  };
}
