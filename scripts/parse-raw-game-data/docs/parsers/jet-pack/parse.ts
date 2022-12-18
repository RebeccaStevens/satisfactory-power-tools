import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseBoolean,
  parseNumber,
  parseClasses,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const equipment = parseConsumableEquipment(data);

  assert(Object.hasOwn(data, "mDefaultAirControl"));
  assert(Object.hasOwn(data, "mRTPCInterval"));
  assert(Object.hasOwn(data, "mThrustCooldown"));
  assert(Object.hasOwn(data, "mCurrentFuel"));
  assert(Object.hasOwn(data, "mIsThrusting"));
  assert(Object.hasOwn(data, "mFuelTypes"));

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
