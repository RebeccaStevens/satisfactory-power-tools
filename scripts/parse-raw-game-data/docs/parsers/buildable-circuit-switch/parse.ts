import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseString,
  parseBoolean,
  parseNumber,
  parsePowerConnections,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assert("mTextRenderers" in data);
  assert("bIsSignificant" in data);
  assert("mMaxCharacters" in data);
  assert("mIsSwitchOn" in data);
  assert("mHasBuildingTag" in data);
  assert("mIsBridgeConnected" in data);
  assert("mConnections" in data);

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
