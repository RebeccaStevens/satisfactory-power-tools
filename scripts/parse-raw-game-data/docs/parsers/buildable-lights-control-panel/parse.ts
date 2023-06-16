import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseBoolean,
  parsePowerConnections,
  parseLightControlData,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assert("mIsEnabled" in data);
  assert("mLightControlData" in data);
  assert("mIsBridgeConnected" in data);
  assert("mConnections" in data);

  return {
    ...buildable,
    mIsEnabled: parseBoolean(data.mIsEnabled),
    mLightControlData: parseLightControlData(data.mLightControlData),
    mIsBridgeConnected: parseBoolean(data.mIsBridgeConnected),
    mConnections: parsePowerConnections(data.mConnections),
  };
}
