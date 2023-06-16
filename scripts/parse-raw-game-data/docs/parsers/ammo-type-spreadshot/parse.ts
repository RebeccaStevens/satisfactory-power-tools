import assert from "node:assert/strict";

import { parseBaseAmmoType } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseMinMaxNumber,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  assert(isObject(data));

  const ammo = parseBaseAmmoType(data);

  assert("mNumShots" in data);
  assert("mSpreadAngleDegrees" in data);

  return {
    ...ammo,
    mNumShots: parseMinMaxNumber(data.mNumShots),
    mSpreadAngleDegrees: parseNumber(data.mSpreadAngleDegrees),
  };
}
