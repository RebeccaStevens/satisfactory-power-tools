import { type ConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";

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
  mScannableDescriptors: string[];
  mShouldBeepEvenIfNoObject: boolean;
};
