import type { BuildableBuilding } from "~/data/core/parsers";
import type { Scale3D, Rotation3D } from "~/data/core/types";

export type Data = BuildableBuilding & {
  mPowerBankCapacity: number;
  mLaunchPowerCost: number;
  mChargeRateMultiplier: number;
  mCurrentPowerLevel: number;
  mLaunchVelocity: number;
  mLaunchAngle: number;
  mPlayerChainJumpResetTime: number;
  mHasPowerForLaunch: boolean;
  // mTrajectoryData: "()";
  mTrajectoryMeshScale: Scale3D;
  mTrajectoryMeshRotation: Rotation3D;
  mDestinationMeshHeightOffset: number;
  mNumArrows: number;
  mTrajectoryGravityMultiplier: number;
  mShowTrajectoryCounter: number;
};
