import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseFalsableNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assert("mCurrentOutputIndex" in data);

  return {
    ...buildable,
    mCurrentOutputIndex: parseFalsableNumber(data.mCurrentOutputIndex),
  };
}
