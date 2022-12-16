import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import {
  parseNumber,
  parseBoolean,
  parseLightControlData,
} from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mIsEnabled"));
  assert(Object.hasOwn(data, "mLightControlData"));
  assert(Object.hasOwn(data, "mPowerConsumption"));
  assert(Object.hasOwn(data, "mHasPower"));
  assert(Object.hasOwn(data, "mIsDay"));

  return {
    ...buildable,
    mIsEnabled: parseBoolean(data.mIsEnabled),
    mLightControlData: parseLightControlData(data.mLightControlData),
    mPowerConsumption: parseNumber(data.mPowerConsumption),
    mHasPower: parseBoolean(data.mHasPower),
    mIsDay: parseBoolean(data.mIsDay),
  };
}
