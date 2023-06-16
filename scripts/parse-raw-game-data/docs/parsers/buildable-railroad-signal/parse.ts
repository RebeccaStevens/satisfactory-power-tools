import assert from "node:assert/strict";

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

  assert("mGuardedConnections" in data);
  assert("mObservedConnections" in data);
  assert("mAspect" in data);
  assert("mBlockValidation" in data);
  assert("mIsPathSignal" in data);
  assert("mIsBiDirectional" in data);
  assert("mVisualState" in data);

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
