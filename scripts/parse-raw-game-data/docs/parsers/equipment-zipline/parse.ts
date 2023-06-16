import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseBoolean, parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const base = parseConsumableEquipment(data);

  assert("mShouldPlayDeactivateSound" in data);
  assert("mZiplineJumpLaunchVelocity" in data);
  assert("mMaxZiplineAngle" in data);
  assert("mTraceDistance" in data);
  assert("mTraceStartOffset" in data);
  assert("mTraceRadius" in data);
  assert("mVisualizeTraceDistance" in data);
  assert("mActiveNoiseFrequency" in data);
  assert("mZiplineReattachCooldown" in data);

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
