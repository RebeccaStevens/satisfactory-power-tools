import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import {
  parsePlatformDockingStatus,
  parseBoolean,
  parseClasses,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableBuilding = parseBuildableBuilding(data);

  assert(Object.hasOwn(data, "mPlatformConnections"));
  assert(Object.hasOwn(data, "mIsOrientationReversed"));
  assert(Object.hasOwn(data, "mPlatformDockingStatus"));
  assert(Object.hasOwn(data, "mSavedDockingStatus"));
  assert(Object.hasOwn(data, "mDockWasCancelled"));

  return {
    ...buildableBuilding,
    mPlatformConnections: parseClasses(data.mPlatformConnections),
    mIsOrientationReversed: parseBoolean(data.mIsOrientationReversed),
    mPlatformDockingStatus: parsePlatformDockingStatus(
      data.mPlatformDockingStatus,
    ),
    mSavedDockingStatus: parsePlatformDockingStatus(data.mSavedDockingStatus),
    mDockWasCancelled: parseBoolean(data.mDockWasCancelled),
  };
}
