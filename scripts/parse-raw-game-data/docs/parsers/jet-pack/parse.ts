import assert from "node:assert/strict";

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

  assert("mDefaultAirControl" in data);
  assert("mRTPCInterval" in data);
  assert("mThrustCooldown" in data);
  assert("mCurrentFuel" in data);
  assert("mIsThrusting" in data);
  assert("mFuelTypes" in data);

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
