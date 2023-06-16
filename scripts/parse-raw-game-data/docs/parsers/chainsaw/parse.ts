import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber, parseBoolean } from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const consumableEquipment = parseConsumableEquipment(data);

  assert("mMontageLength" in data);
  assert("mInterpSawProgress" in data);
  assert("mWasSawing" in data);
  assert("mPlayingSound" in data);
  assert("mCurrentOutputDataSFX" in data);
  assert("mEnergyConsumption" in data);
  assert("mSawDownTreeTime" in data);
  assert("mCollateralPickupRadius" in data);
  assert("mExcludeChainsawableFoliage" in data);
  assert("mEnergyStored" in data);

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
