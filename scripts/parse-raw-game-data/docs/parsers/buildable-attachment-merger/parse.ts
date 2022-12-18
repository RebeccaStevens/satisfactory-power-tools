import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseFalsableNumber } from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mCurrentInputIndex"));

  return {
    ...buildable,
    mCurrentInputIndex: parseFalsableNumber(data.mCurrentInputIndex),
  };
}
