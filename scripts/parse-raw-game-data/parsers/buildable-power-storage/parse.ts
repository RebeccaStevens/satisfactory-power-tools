import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import {
  parseNumber,
  parseBatteryStatus,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableBuilding = parseBuildableBuilding(data);

  assert(Object.hasOwn(data, "m_PreviousBatteryStatus"));
  assert(Object.hasOwn(data, "mCurrentGameTimeSinceStateChange"));
  assert(Object.hasOwn(data, "mActivationEventID"));
  assert(Object.hasOwn(data, "mBatteryStatus"));
  assert(Object.hasOwn(data, "mPowerStore"));
  assert(Object.hasOwn(data, "mPowerStoreCapacity"));
  assert(Object.hasOwn(data, "mPowerInputCapacity"));
  assert(Object.hasOwn(data, "mIndicatorLevelMax"));
  assert(Object.hasOwn(data, "mIndicatorLevel"));

  return {
    ...buildableBuilding,
    m_PreviousBatteryStatus: parseBatteryStatus(data.m_PreviousBatteryStatus),
    mCurrentGameTimeSinceStateChange: parseNumber(
      data.mCurrentGameTimeSinceStateChange,
    ),
    mActivationEventID: parseNumber(data.mActivationEventID),
    mBatteryStatus: parseBatteryStatus(data.mBatteryStatus),
    mPowerStore: parseNumber(data.mPowerStore),
    mPowerStoreCapacity: parseNumber(data.mPowerStoreCapacity),
    mPowerInputCapacity: parseNumber(data.mPowerInputCapacity),
    mIndicatorLevelMax: parseNumber(data.mIndicatorLevelMax),
    mIndicatorLevel: parseNumber(data.mIndicatorLevel),
  };
}
