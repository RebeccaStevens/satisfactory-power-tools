import { assert } from "chai";

import {
  type VendorFGBuildableFactory,
  assertVendorFGBuildableFactory,
} from "~/game-data/parsers/FGBuildableFactory/assert";

export function assertVendorFGBuildableDockingStation(
  data: unknown,
): asserts data is VendorFGBuildableDockingStation {
  assertVendorFGBuildableFactory(data);

  assert.isEmpty(
    [
      "mDockPosition",
      "mMinimumDockingTime",
      "mStorageSizeX",
      "mStorageSizeY",
      "mFuelInventorySizeX",
      "mFuelInventorySizeY",
      "mTransferSpeed",
      "mFuelTransferSpeed",
      "mStackTransferSize",
      "mForceSignificance",
      "mVehicleFuelConsumptionRate",
      "mItemTransferRate",
      "mMaximumStackTransferRate",
      "mDockingVehicleStatistics",
    ].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGBuildableDockingStation",
  );
}

export type VendorFGBuildableDockingStation = VendorFGBuildableFactory & {
  mDockPosition: string;
  mMinimumDockingTime: string;
  mStorageSizeX: string;
  mStorageSizeY: string;
  mFuelInventorySizeX: string;
  mFuelInventorySizeY: string;
  mTransferSpeed: string;
  mFuelTransferSpeed: string;
  mStackTransferSize: string;
  mForceSignificance: string;
  mVehicleFuelConsumptionRate: string;
  mItemTransferRate: string;
  mMaximumStackTransferRate: string;
  mDockingVehicleStatistics: string;
};
