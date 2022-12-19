import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseBoolean,
  parseRailroadConnections,
  parseFalsableNumber,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assert("mMeshLength" in data);
  assert("mConnections" in data);
  assert("mIsOwnedByPlatform" in data);
  assert("mTrackGraphID" in data);
  assert("mSignalBlockID" in data);

  return {
    ...buildable,
    mMeshLength: parseNumber(data.mMeshLength),
    mConnections: parseRailroadConnections(data.mConnections),
    mIsOwnedByPlatform: parseBoolean(data.mIsOwnedByPlatform),
    mTrackGraphID: parseFalsableNumber(data.mTrackGraphID),
    mSignalBlockID: parseNumber(data.mSignalBlockID),
  };
}
