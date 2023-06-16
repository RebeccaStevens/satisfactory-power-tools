import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parsePlatformDockingStatus,
  parseBoolean,
  parseClasses,
  parseNumber,
  parseString,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assert("mMapText" in data);
  assert("mShouldTeleportHere" in data);
  assert("mCurrentDockForDuration" in data);
  assert("mPlatformConnections" in data);
  assert("mIsOrientationReversed" in data);
  assert("mPlatformDockingStatus" in data);
  assert("mSavedDockingStatus" in data);
  assert("mDockWasCancelled" in data);

  return {
    ...buildableBuilding,
    mMapText: parseString(data.mMapText),
    mShouldTeleportHere: parseBoolean(data.mShouldTeleportHere),
    mCurrentDockForDuration: parseNumber(data.mCurrentDockForDuration),
    mPlatformConnections: parseClasses(data.mPlatformConnections),
    mIsOrientationReversed: parseBoolean(data.mIsOrientationReversed),
    mPlatformDockingStatus: parsePlatformDockingStatus(
      data.mPlatformDockingStatus,
    ),
    mSavedDockingStatus: parsePlatformDockingStatus(data.mSavedDockingStatus),
    mDockWasCancelled: parseBoolean(data.mDockWasCancelled),
  };
}
