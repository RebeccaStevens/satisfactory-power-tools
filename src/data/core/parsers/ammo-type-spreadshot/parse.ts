import assert from "node:assert/strict";

import { parseBaseAmmoType } from "~/data/core/parsers";
import { parseNumber, parseMinMaxNumber } from "~/data/core/utils";

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
