import { type BuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  type ItemTransferringStage,
  type Point3D,
} from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableBuilding & {
  mStoppedProducingAnimationSounds: boolean;
  mDroneDockingStartLocationLocal: Point3D;
  mDroneDockingLocationLocal: Point3D;
  mBatteryClasses: string[];
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
