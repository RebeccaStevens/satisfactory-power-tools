import { assert } from "chai";

import {
  type VendorFGBuildableFactory,
  assertVendorFGBuildableFactory,
} from "~/game-data/parsers/FGBuildableFactory/assert";

export function assertVendorFGCentralStorageContainer(
  data: unknown,
): asserts data is VendorFGCentralStorageContainer {
  assertVendorFGBuildableFactory(data);

  assert.isEmpty(
    [
      "TimeToExecuteCheckAfterItemAdded",
      "mUploadTimer",
      "mTimeToUpload",
      "mStackingHeight",
      "mInventorySizeX",
      "mInventorySizeY",
    ].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGCentralStorageContainer",
  );
}

export type VendorFGCentralStorageContainer = VendorFGBuildableFactory & {
  TimeToExecuteCheckAfterItemAdded: string;
  mUploadTimer: string;
  mTimeToUpload: string;
  mStackingHeight: string;
  mInventorySizeX: string;
  mInventorySizeY: string;
};
