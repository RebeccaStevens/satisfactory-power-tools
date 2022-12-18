import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseBoolean, parseNumber } from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const base = parseConsumableEquipment(data);

  assert(Object.hasOwn(data, "mShouldPlayDeactivateSound"));
  assert(Object.hasOwn(data, "mZiplineJumpLaunchVelocity"));
  assert(Object.hasOwn(data, "mMaxZiplineAngle"));
  assert(Object.hasOwn(data, "mTraceDistance"));
  assert(Object.hasOwn(data, "mTraceStartOffset"));
  assert(Object.hasOwn(data, "mTraceRadius"));
  assert(Object.hasOwn(data, "mVisualizeTraceDistance"));
  assert(Object.hasOwn(data, "mActiveNoiseFrequency"));
  assert(Object.hasOwn(data, "mZiplineReattachCooldown"));

  return {
    ...base,
    mShouldPlayDeactivateSound: parseBoolean(data.mShouldPlayDeactivateSound),
    mZiplineJumpLaunchVelocity: parseNumber(data.mZiplineJumpLaunchVelocity),
    mMaxZiplineAngle: parseNumber(data.mMaxZiplineAngle),
    mTraceDistance: parseNumber(data.mTraceDistance),
    mTraceStartOffset: parseNumber(data.mTraceStartOffset),
    mTraceRadius: parseNumber(data.mTraceRadius),
    mVisualizeTraceDistance: parseBoolean(data.mVisualizeTraceDistance),
    mActiveNoiseFrequency: parseNumber(data.mActiveNoiseFrequency),
    mZiplineReattachCooldown: parseNumber(data.mZiplineReattachCooldown),
  };
}
