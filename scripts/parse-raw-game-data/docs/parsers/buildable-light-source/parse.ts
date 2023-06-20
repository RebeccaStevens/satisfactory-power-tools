import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseBoolean,
  parseLightControlData,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mIsEnabled");
  assertPropertyExists(data, "mLightControlData");
  assertPropertyExists(data, "mPowerConsumption");
  assertPropertyExists(data, "mHasPower");
  assertPropertyExists(data, "mIsDay");

  return {
    ...buildable,
    mIsEnabled: parseBoolean(data.mIsEnabled),
    mLightControlData: parseLightControlData(data.mLightControlData),
    mPowerConsumption: parseNumber(data.mPowerConsumption),
    mHasPower: parseBoolean(data.mHasPower),
    mIsDay: parseBoolean(data.mIsDay),
  };
}
