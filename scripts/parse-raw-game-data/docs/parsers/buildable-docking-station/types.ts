import type { BuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import type { Point2D } from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableBuilding & {
  mDockPosition: Point2D;
  mMinimumDockingTime: number;
  mStorageSizeX: number;
  mStorageSizeY: number;
  mFuelInventorySizeX: number;
  mFuelInventorySizeY: number;
  mTransferSpeed: number;
  mFuelTransferSpeed: number;
  mStackTransferSize: number;
  mForceSignificance: boolean;
  mVehicleFuelConsumptionRate: number;
  mItemTransferRate: number;
  mMaximumStackTransferRate: number;
  // mDockingVehicleStatistics: "()";
};
