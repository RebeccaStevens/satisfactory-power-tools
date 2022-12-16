import type { BuildableBuilding } from "~/data/core/parsers";
import type { PlatformDockingStatus } from "~/data/core/types";

export type Data = BuildableBuilding & {
  mPlatformConnections: Set<string>;
  mIsOrientationReversed: boolean;
  mPlatformDockingStatus: PlatformDockingStatus;
  mSavedDockingStatus: PlatformDockingStatus;
  mDockWasCancelled: boolean;
};
