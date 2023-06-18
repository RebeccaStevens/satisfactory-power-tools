import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
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

  assertPropertyExists(data, "m_PreviousBatteryStatus");
  assertPropertyExists(data, "mCurrentGameTimeSinceStateChange");
  assertPropertyExists(data, "mActivationEventID");
  assertPropertyExists(data, "mBatteryStatus");
  assertPropertyExists(data, "mPowerStore");
  assertPropertyExists(data, "mPowerStoreCapacity");
  assertPropertyExists(data, "mPowerInputCapacity");
  assertPropertyExists(data, "mIndicatorLevelMax");
  assertPropertyExists(data, "mIndicatorLevel");

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
