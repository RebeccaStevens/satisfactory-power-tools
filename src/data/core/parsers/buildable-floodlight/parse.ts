import assert from "node:assert/strict";

import { parseBuildableLightSource } from "~/data/core/parsers";
import { parseNumber } from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const base = parseBuildableLightSource(data);

  assert(Object.hasOwn(data, "mFixtureAngle"));
  return {
    ...base,
    mFixtureAngle: parseNumber(data.mFixtureAngle),
  };
}
