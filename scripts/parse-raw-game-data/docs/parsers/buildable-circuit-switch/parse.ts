import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseString,
  parseBoolean,
  parseNumber,
  parsePowerConnections,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mTextRenderers");
  assertPropertyExists(data, "bIsSignificant");
  assertPropertyExists(data, "mMaxCharacters");
  assertPropertyExists(data, "mIsSwitchOn");
  assertPropertyExists(data, "mHasBuildingTag");
  assertPropertyExists(data, "mIsBridgeConnected");
  assertPropertyExists(data, "mConnections");

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
