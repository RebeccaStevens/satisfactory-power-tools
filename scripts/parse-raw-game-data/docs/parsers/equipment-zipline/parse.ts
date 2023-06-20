import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseBoolean, parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const base = parseConsumableEquipment(data);

  assertPropertyExists(data, "mShouldPlayDeactivateSound");
  assertPropertyExists(data, "mZiplineJumpLaunchVelocity");
  assertPropertyExists(data, "mMaxZiplineAngle");
  assertPropertyExists(data, "mTraceDistance");
  assertPropertyExists(data, "mTraceStartOffset");
  assertPropertyExists(data, "mTraceRadius");
  assertPropertyExists(data, "mVisualizeTraceDistance");
  assertPropertyExists(data, "mActiveNoiseFrequency");
  assertPropertyExists(data, "mZiplineReattachCooldown");

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
