import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
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

  assertPropertyExists(data, "mPowerConnections");
  assertPropertyExists(data, "mPowerPoleType");
  assertPropertyExists(data, "mHasPower");

  return {
    ...buildable,
    mPowerConnections: parsePowerConnections(data.mPowerConnections),
    mPowerPoleType: parsePowerPoleType(data.mPowerPoleType),
    mHasPower: parseBoolean(data.mHasPower),
  };
}
