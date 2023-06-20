import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parsePlatformDockingStatus,
  parseBoolean,
  parseClasses,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assertPropertyExists(data, "mPlatformConnections");
  assertPropertyExists(data, "mIsOrientationReversed");
  assertPropertyExists(data, "mPlatformDockingStatus");
  assertPropertyExists(data, "mSavedDockingStatus");
  assertPropertyExists(data, "mDockWasCancelled");

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
