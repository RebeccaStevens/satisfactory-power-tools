import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseFalsableNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mCurrentInputIndex");

  return {
    ...buildable,
    mCurrentInputIndex: parseFalsableNumber(data.mCurrentInputIndex),
  };
}
