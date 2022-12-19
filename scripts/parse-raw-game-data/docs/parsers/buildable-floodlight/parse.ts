import assert from "node:assert/strict";

import { parseBuildableLightSource } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const base = parseBuildableLightSource(data);

  assert("mFixtureAngle" in data);
  return {
    ...base,
    mFixtureAngle: parseNumber(data.mFixtureAngle),
  };
}
