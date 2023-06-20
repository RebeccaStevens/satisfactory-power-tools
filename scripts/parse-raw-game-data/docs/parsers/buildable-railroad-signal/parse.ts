import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseRailroadAspect,
  parseRailroadConnections,
  parseRailroadBlockValidation,
  parseBoolean,
  parseNumber,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mGuardedConnections");
  assertPropertyExists(data, "mObservedConnections");
  assertPropertyExists(data, "mAspect");
  assertPropertyExists(data, "mBlockValidation");
  assertPropertyExists(data, "mIsPathSignal");
  assertPropertyExists(data, "mIsBiDirectional");
  assertPropertyExists(data, "mVisualState");

  return {
    ...buildable,
    mGuardedConnections: parseRailroadConnections(data.mGuardedConnections),
    mObservedConnections: parseRailroadConnections(data.mObservedConnections),
    mAspect: parseRailroadAspect(data.mAspect),
    mBlockValidation: parseRailroadBlockValidation(data.mBlockValidation),
    mIsPathSignal: parseBoolean(data.mIsPathSignal),
    mIsBiDirectional: parseBoolean(data.mIsBiDirectional),
    mVisualState: parseNumber(data.mVisualState),
  };
}
