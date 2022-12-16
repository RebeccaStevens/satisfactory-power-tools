import type { BuildableBuilding } from "~/data/core/parsers";

export type Data = BuildableBuilding & {
  mWorkBenchOccupied: string;
  mWorkBenchFree: string;
  mShipUpgradeLevel: number;
  mStorageText: string;
  mMamFreeText: string;
  mMamOccupiedText: string;
  mStorageInventorySize: number;
  mStorageVisibilityLevel: number;
  mSpawningGroundZOffset: number;
  mGroundSearchZDistance: number;
  mNeedPlayingBuildEffectNotification: boolean;
  mRepresentationText: string;
};
