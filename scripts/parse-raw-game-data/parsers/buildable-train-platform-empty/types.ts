import type { BuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import type { PlatformDockingStatus } from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableBuilding & {
  mPlatformConnections: Array<string>;
  mIsOrientationReversed: boolean;
  mPlatformDockingStatus: PlatformDockingStatus;
  mSavedDockingStatus: PlatformDockingStatus;
  mDockWasCancelled: boolean;
};
