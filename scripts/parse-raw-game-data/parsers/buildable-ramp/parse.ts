import assert from "node:assert/strict";

import { parseBuildableFoundation } from "~/scripts/parse-raw-game-data/parsers";
import { parseBoolean } from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildableFoundation(data);

  assert(Object.hasOwn(data, "mIsDoubleRamp"));
  assert(Object.hasOwn(data, "mIsRoof"));

  return {
    ...buildable,
    mIsDoubleRamp: parseBoolean(data.mIsDoubleRamp),
    mIsRoof: parseBoolean(data.mIsRoof),
  };
}
