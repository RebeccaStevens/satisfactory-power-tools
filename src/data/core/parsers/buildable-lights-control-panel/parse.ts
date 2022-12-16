import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import {
  parseBoolean,
  parsePowerConnections,
  parseLightControlData,
} from "~/data/core/utils";

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
