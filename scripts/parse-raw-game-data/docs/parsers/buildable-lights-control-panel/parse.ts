import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
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

  assertPropertyExists(data, "mIsEnabled");
  assertPropertyExists(data, "mLightControlData");
  assertPropertyExists(data, "mIsBridgeConnected");
  assertPropertyExists(data, "mConnections");

  return {
    ...buildable,
    mIsEnabled: parseBoolean(data.mIsEnabled),
    mLightControlData: parseLightControlData(data.mLightControlData),
    mIsBridgeConnected: parseBoolean(data.mIsBridgeConnected),
    mConnections: parsePowerConnections(data.mConnections),
  };
}
