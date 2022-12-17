import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/parsers";
import {
  parseRailroadAspect,
  parseRailroadConnections,
  parseRailroadBlockValidation,
  parseBoolean,
  parseNumber,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mGuardedConnections"));
  assert(Object.hasOwn(data, "mObservedConnections"));
  assert(Object.hasOwn(data, "mAspect"));
  assert(Object.hasOwn(data, "mBlockValidation"));
  assert(Object.hasOwn(data, "mIsPathSignal"));
  assert(Object.hasOwn(data, "mIsBiDirectional"));
  assert(Object.hasOwn(data, "mVisualState"));

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
