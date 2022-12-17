import type { BuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";

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
