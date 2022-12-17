import type { BuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import type { PlatformDockingStatus } from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableBuilding & {
  mMapText: string;
  mShouldTeleportHere: boolean;
  // mDockedPlatformList: "";
  // mCurrentDockedWithRuleSet: "(DockForDuration=15.000000)";
  mCurrentDockForDuration: number;
  mPlatformConnections: Array<string>;
  mIsOrientationReversed: boolean;
  mPlatformDockingStatus: PlatformDockingStatus;
  mSavedDockingStatus: PlatformDockingStatus;
  mDockWasCancelled: boolean;
};
