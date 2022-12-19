import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseBoolean,
  parseLightControlData,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assert("mIsEnabled" in data);
  assert("mLightControlData" in data);
  assert("mPowerConsumption" in data);
  assert("mHasPower" in data);
  assert("mIsDay" in data);

  return {
    ...buildable,
    mIsEnabled: parseBoolean(data.mIsEnabled),
    mLightControlData: parseLightControlData(data.mLightControlData),
    mPowerConsumption: parseNumber(data.mPowerConsumption),
    mHasPower: parseBoolean(data.mHasPower),
    mIsDay: parseBoolean(data.mIsDay),
  };
}
