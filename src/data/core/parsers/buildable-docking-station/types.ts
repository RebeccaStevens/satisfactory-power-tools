import type { BuildableBuilding } from "~/data/core/parsers";
import type { Point2D } from "~/data/core/types";

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
