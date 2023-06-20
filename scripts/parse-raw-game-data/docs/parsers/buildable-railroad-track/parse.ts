import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseBoolean,
  parseRailroadConnections,
  parseFalsableNumber,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mMeshLength");
  assertPropertyExists(data, "mConnections");
  assertPropertyExists(data, "mIsOwnedByPlatform");
  assertPropertyExists(data, "mTrackGraphID");
  assertPropertyExists(data, "mSignalBlockID");

  return {
    ...buildable,
    mMeshLength: parseNumber(data.mMeshLength),
    mConnections: parseRailroadConnections(data.mConnections),
    mIsOwnedByPlatform: parseBoolean(data.mIsOwnedByPlatform),
    mTrackGraphID: parseFalsableNumber(data.mTrackGraphID),
    mSignalBlockID: parseNumber(data.mSignalBlockID),
  };
}
