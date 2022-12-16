import type { Buildable } from "~/data/core/parsers";
import type { PipeConnection, Spline } from "~/data/core/types";

export type Data = Buildable & {
  mRadius: number;
  mFlowLimit: number;
  mFlowIndicatorMinimumPipeLength: number;
  mPipeConnections: Set<PipeConnection>;
  mMaxIndicatorTurnAngle: number;
  mFluidNames: Set<{ WwiseSafeName: string; ActualName: string }>;
  mCurrentFluid: string;
  mLastContentForSound: number;
  mLastFlowForSound: number;
  mRattleLimit: number;
  mIsRattling: boolean;
  mMeshLength: number;
  mSplineData: Spline;
};
