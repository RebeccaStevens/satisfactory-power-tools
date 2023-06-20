import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildableManufacturer } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableManufacturer = parseBuildableManufacturer(data);

  assertPropertyExists(data, "mSequenceDuration");
  assertPropertyExists(data, "mGameTimeAtProducing");
  assertPropertyExists(data, "mCurrentProducingSeekTime");
  assertPropertyExists(data, "mEstimatedMininumPowerConsumption");
  assertPropertyExists(data, "mEstimatedMaximumPowerConsumption");

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
