import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parsePowerConnections,
  parsePowerPoleType,
  parseBoolean,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mPowerConnections"));
  assert(Object.hasOwn(data, "mPowerPoleType"));
  assert(Object.hasOwn(data, "mHasPower"));

  return {
    ...buildable,
    mPowerConnections: parsePowerConnections(data.mPowerConnections),
    mPowerPoleType: parsePowerPoleType(data.mPowerPoleType),
    mHasPower: parseBoolean(data.mHasPower),
  };
}
