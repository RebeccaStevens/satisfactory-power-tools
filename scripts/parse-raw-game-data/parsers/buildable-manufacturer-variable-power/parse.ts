import assert from "node:assert/strict";

import { parseBuildableManufacturer } from "~/scripts/parse-raw-game-data/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableManufacturer = parseBuildableManufacturer(data);

  assert(Object.hasOwn(data, "mSequenceDuration"));
  assert(Object.hasOwn(data, "mGameTimeAtProducing"));
  assert(Object.hasOwn(data, "mCurrentProducingSeekTime"));
  assert(Object.hasOwn(data, "mEstimatedMininumPowerConsumption"));
  assert(Object.hasOwn(data, "mEstimatedMaximumPowerConsumption"));

  return {
    ...buildableManufacturer,
    mSequenceDuration: parseNumber(data.mSequenceDuration),
    mGameTimeAtProducing: parseNumber(data.mGameTimeAtProducing),
    mCurrentProducingSeekTime: parseNumber(data.mCurrentProducingSeekTime),
    mEstimatedMininumPowerConsumption: parseNumber(
      data.mEstimatedMininumPowerConsumption,
    ),
    mEstimatedMaximumPowerConsumption: parseNumber(
      data.mEstimatedMaximumPowerConsumption,
    ),
  };
}
