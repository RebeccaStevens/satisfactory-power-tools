import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parsePowerConnections,
  parsePowerPoleType,
  parseBoolean,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assert("mPowerConnections" in data);
  assert("mPowerPoleType" in data);
  assert("mHasPower" in data);

  return {
    ...buildable,
    mPowerConnections: parsePowerConnections(data.mPowerConnections),
    mPowerPoleType: parsePowerPoleType(data.mPowerPoleType),
    mHasPower: parseBoolean(data.mHasPower),
  };
}
