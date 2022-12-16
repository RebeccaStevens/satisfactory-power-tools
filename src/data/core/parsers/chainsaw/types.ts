import type { ConsumableEquipment } from "~/data/core/parsers";

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
