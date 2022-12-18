import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseBoolean,
  parsePowerConnections,
  parseLightControlData,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mIsEnabled"));
  assert(Object.hasOwn(data, "mLightControlData"));
  assert(Object.hasOwn(data, "mIsBridgeConnected"));
  assert(Object.hasOwn(data, "mConnections"));

  return {
    ...buildable,
    mIsEnabled: parseBoolean(data.mIsEnabled),
    mLightControlData: parseLightControlData(data.mLightControlData),
    mIsBridgeConnected: parseBoolean(data.mIsBridgeConnected),
    mConnections: parsePowerConnections(data.mConnections),
  };
}
