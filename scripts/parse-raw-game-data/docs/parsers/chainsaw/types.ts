import { type ConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";

export type Data = ConsumableEquipment & {
  mMontageLength: number;
  mInterpSawProgress: number;
  mWasSawing: boolean;
  mPlayingSound: boolean;
  mCurrentOutputDataSFX: number;
  mEnergyConsumption: number;
  mSawDownTreeTime: number;
  mCollateralPickupRadius: number;
  mExcludeChainsawableFoliage: boolean;
  mEnergyStored: number;
};
