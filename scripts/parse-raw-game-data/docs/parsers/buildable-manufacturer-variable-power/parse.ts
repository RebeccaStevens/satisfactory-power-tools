import assert from "node:assert/strict";

import { parseBuildableManufacturer } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableManufacturer = parseBuildableManufacturer(data);

  assert("mSequenceDuration" in data);
  assert("mGameTimeAtProducing" in data);
  assert("mCurrentProducingSeekTime" in data);
  assert("mEstimatedMininumPowerConsumption" in data);
  assert("mEstimatedMaximumPowerConsumption" in data);

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
