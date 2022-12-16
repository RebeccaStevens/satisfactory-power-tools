import type { ConsumableEquipment } from "~/data/core/parsers";

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
  mScannableDescriptors: Set<string>;
  mShouldBeepEvenIfNoObject: boolean;
};
