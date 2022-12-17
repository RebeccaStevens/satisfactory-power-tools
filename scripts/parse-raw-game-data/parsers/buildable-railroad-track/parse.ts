import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/parsers";
import {
  parseNumber,
  parseBoolean,
  parseRailroadConnections,
  parseFalsableNumber,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mMeshLength"));
  assert(Object.hasOwn(data, "mConnections"));
  assert(Object.hasOwn(data, "mIsOwnedByPlatform"));
  assert(Object.hasOwn(data, "mTrackGraphID"));
  assert(Object.hasOwn(data, "mSignalBlockID"));

  return {
    ...buildable,
    mMeshLength: parseNumber(data.mMeshLength),
    mConnections: parseRailroadConnections(data.mConnections),
    mIsOwnedByPlatform: parseBoolean(data.mIsOwnedByPlatform),
    mTrackGraphID: parseFalsableNumber(data.mTrackGraphID),
    mSignalBlockID: parseNumber(data.mSignalBlockID),
  };
}
