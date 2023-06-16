import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseBatteryStatus,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assert("m_PreviousBatteryStatus" in data);
  assert("mCurrentGameTimeSinceStateChange" in data);
  assert("mActivationEventID" in data);
  assert("mBatteryStatus" in data);
  assert("mPowerStore" in data);
  assert("mPowerStoreCapacity" in data);
  assert("mPowerInputCapacity" in data);
  assert("mIndicatorLevelMax" in data);
  assert("mIndicatorLevel" in data);

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
