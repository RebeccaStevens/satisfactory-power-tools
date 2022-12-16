import type { BuildableBuilding } from "~/data/core/parsers";
import type { PlatformDockingStatus } from "~/data/core/types";

export type Data = BuildableBuilding & {
  mMapText: string;
  mShouldTeleportHere: boolean;
  // mDockedPlatformList: "";
  // mCurrentDockedWithRuleSet: "(DockForDuration=15.000000)";
  mCurrentDockForDuration: number;
  mPlatformConnections: Set<string>;
  mIsOrientationReversed: boolean;
  mPlatformDockingStatus: PlatformDockingStatus;
  mSavedDockingStatus: PlatformDockingStatus;
  mDockWasCancelled: boolean;
};
