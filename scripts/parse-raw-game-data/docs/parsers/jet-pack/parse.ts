import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseBoolean,
  parseNumber,
  parseClasses,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const equipment = parseConsumableEquipment(data);

  assertPropertyExists(data, "mDefaultAirControl");
  assertPropertyExists(data, "mRTPCInterval");
  assertPropertyExists(data, "mThrustCooldown");
  assertPropertyExists(data, "mCurrentFuel");
  assertPropertyExists(data, "mIsThrusting");
  assertPropertyExists(data, "mFuelTypes");

  return {
    ...equipment,
    mDefaultAirControl: parseNumber(data.mDefaultAirControl),
    mRTPCInterval: parseNumber(data.mRTPCInterval),
    mThrustCooldown: parseNumber(data.mThrustCooldown),
    mCurrentFuel: parseNumber(data.mCurrentFuel),
    mIsThrusting: parseBoolean(data.mIsThrusting),
    mFuelTypes: parseClasses(data.mFuelTypes),
  };
}
