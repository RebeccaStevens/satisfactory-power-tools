import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/parsers";
import {
  parseString,
  parseBoolean,
  parseNumber,
  parsePowerConnections,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mTextRenderers"));
  assert(Object.hasOwn(data, "bIsSignificant"));
  assert(Object.hasOwn(data, "mMaxCharacters"));
  assert(Object.hasOwn(data, "mIsSwitchOn"));
  assert(Object.hasOwn(data, "mHasBuildingTag"));
  assert(Object.hasOwn(data, "mIsBridgeConnected"));
  assert(Object.hasOwn(data, "mConnections"));

  return {
    ...buildable,
    mTextRenderers: parseString(data.mTextRenderers),
    bIsSignificant: parseBoolean(data.bIsSignificant),
    mMaxCharacters: parseNumber(data.mMaxCharacters),
    mIsSwitchOn: parseBoolean(data.mIsSwitchOn),
    mHasBuildingTag: parseBoolean(data.mHasBuildingTag),
    mIsBridgeConnected: parseBoolean(data.mIsBridgeConnected),
    mConnections: parsePowerConnections(data.mConnections),
  };
}
