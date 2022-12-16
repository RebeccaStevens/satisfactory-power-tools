import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import {
  parsePowerConnections,
  parsePowerPoleType,
  parseBoolean,
} from "~/data/core/utils";

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
