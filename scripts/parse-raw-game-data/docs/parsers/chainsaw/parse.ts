import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber, parseBoolean } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const consumableEquipment = parseConsumableEquipment(data);

  assertPropertyExists(data, "mMontageLength");
  assertPropertyExists(data, "mInterpSawProgress");
  assertPropertyExists(data, "mWasSawing");
  assertPropertyExists(data, "mPlayingSound");
  assertPropertyExists(data, "mCurrentOutputDataSFX");
  assertPropertyExists(data, "mEnergyConsumption");
  assertPropertyExists(data, "mSawDownTreeTime");
  assertPropertyExists(data, "mCollateralPickupRadius");
  assertPropertyExists(data, "mExcludeChainsawableFoliage");
  assertPropertyExists(data, "mEnergyStored");

  return {
    ...consumableEquipment,
    mMontageLength: parseNumber(data.mMontageLength),
    mInterpSawProgress: parseNumber(data.mInterpSawProgress),
    mWasSawing: parseBoolean(data.mWasSawing),
    mPlayingSound: parseBoolean(data.mPlayingSound),
    mCurrentOutputDataSFX: parseNumber(data.mCurrentOutputDataSFX),
    mEnergyConsumption: parseNumber(data.mEnergyConsumption),
    mSawDownTreeTime: parseNumber(data.mSawDownTreeTime),
    mCollateralPickupRadius: parseNumber(data.mCollateralPickupRadius),
    mExcludeChainsawableFoliage: parseBoolean(data.mExcludeChainsawableFoliage),
    mEnergyStored: parseNumber(data.mEnergyStored),
  };
}
