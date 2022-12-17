import type { ConsumableEquipment } from "~/scripts/parse-raw-game-data/parsers";

export type Data = ConsumableEquipment & {
  mPlayingSound: boolean;
  mScanlineLerpT: number;
  mScreenUpdateTime: number;
  mNormalizedCloesnessToObject: number;
  mObjectIsWithinRange: boolean;
  mBeepDelayMax: number;
  mBeepDelayMin: number;
  mDetectionRange: number;
  mUpdateClosestObjectTime: number;
  mScannableDescriptors: Array<string>;
  mShouldBeepEvenIfNoObject: boolean;
};
