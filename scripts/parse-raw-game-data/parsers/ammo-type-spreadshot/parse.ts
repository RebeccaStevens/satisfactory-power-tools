import assert from "node:assert/strict";

import { parseBaseAmmoType } from "~/scripts/parse-raw-game-data/parsers";
import {
  parseNumber,
  parseMinMaxNumber,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const ammo = parseBaseAmmoType(data);

  assert(Object.hasOwn(data, "mNumShots"));
  assert(Object.hasOwn(data, "mSpreadAngleDegrees"));

  return {
    ...ammo,
    mNumShots: parseMinMaxNumber(data.mNumShots),
    mSpreadAngleDegrees: parseNumber(data.mSpreadAngleDegrees),
  };
}
