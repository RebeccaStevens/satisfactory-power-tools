import assert from "node:assert/strict";

import { parseConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseNumber, parseBoolean } from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const consumableEquipment = parseConsumableEquipment(data);

  assert(Object.hasOwn(data, "mMontageLength"));
  assert(Object.hasOwn(data, "mInterpSawProgress"));
  assert(Object.hasOwn(data, "mWasSawing"));
  assert(Object.hasOwn(data, "mPlayingSound"));
  assert(Object.hasOwn(data, "mCurrentOutputDataSFX"));
  assert(Object.hasOwn(data, "mEnergyConsumption"));
  assert(Object.hasOwn(data, "mSawDownTreeTime"));
  assert(Object.hasOwn(data, "mCollateralPickupRadius"));
  assert(Object.hasOwn(data, "mExcludeChainsawableFoliage"));
  assert(Object.hasOwn(data, "mEnergyStored"));

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
