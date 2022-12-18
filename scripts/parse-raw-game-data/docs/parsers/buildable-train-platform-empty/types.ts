import type { BuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import type { PlatformDockingStatus } from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableBuilding & {
  mPlatformConnections: string[];
  mIsOrientationReversed: boolean;
  mPlatformDockingStatus: PlatformDockingStatus;
  mSavedDockingStatus: PlatformDockingStatus;
  mDockWasCancelled: boolean;
};
