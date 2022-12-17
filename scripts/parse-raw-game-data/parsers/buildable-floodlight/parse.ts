import assert from "node:assert/strict";

import { parseBuildableLightSource } from "~/scripts/parse-raw-game-data/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const base = parseBuildableLightSource(data);

  assert(Object.hasOwn(data, "mFixtureAngle"));
  return {
    ...base,
    mFixtureAngle: parseNumber(data.mFixtureAngle),
  };
}
