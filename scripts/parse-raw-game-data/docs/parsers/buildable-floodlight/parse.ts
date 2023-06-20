import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildableLightSource } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const base = parseBuildableLightSource(data);

  assertPropertyExists(data, "mFixtureAngle");
  return {
    ...base,
    mFixtureAngle: parseNumber(data.mFixtureAngle),
  };
}
