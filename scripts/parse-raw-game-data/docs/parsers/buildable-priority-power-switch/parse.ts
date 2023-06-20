import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildableCircuitSwitch } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const circuitSwitch = parseBuildableCircuitSwitch(data);

  assertPropertyExists(data, "mPriority");

  return {
    ...circuitSwitch,
    mPriority: parseNumber(data.mPriority),
  };
}
