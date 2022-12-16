import type { BuildableBuilding } from "~/data/core/parsers";
import type { ItemTransferringStage, Point3D } from "~/data/core/types";

export type Data = BuildableBuilding & {
  mStoppedProducingAnimationSounds: boolean;
  mDroneDockingStartLocationLocal: Point3D;
  mDroneDockingLocationLocal: Point3D;
  mBatteryClasses: Set<string>;
  mStationHasDronesInQueue: boolean;
  mItemTransferringStage: ItemTransferringStage;
  mTransferProgress: number;
  mTransferSpeed: number;
  mStackTransferSize: number;
  mDroneQueueRadius: number;
  mDroneQueueSeparationRadius: number;
  mDroneQueueVerticalSeparation: number;
  mTripPowerCost: number;
  mTripPowerPerMeterCost: number;
  mTripInformationSampleCount: number;
  mStorageSizeX: number;
  mStorageSizeY: number;
  mBatteryStorageSizeX: number;
  mBatteryStorageSizeY: number;
  mMapText: string;
};
