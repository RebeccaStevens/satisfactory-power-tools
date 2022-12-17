import type { Buildable } from "~/scripts/parse-raw-game-data/parsers";
import type {
  PipeConnection,
  Spline,
} from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mRadius: number;
  mFlowLimit: number;
  mFlowIndicatorMinimumPipeLength: number;
  mPipeConnections: Array<PipeConnection>;
  mMaxIndicatorTurnAngle: number;
  mFluidNames: Array<{ WwiseSafeName: string; ActualName: string }>;
  mCurrentFluid: string;
  mLastContentForSound: number;
  mLastFlowForSound: number;
  mRattleLimit: number;
  mIsRattling: boolean;
  mMeshLength: number;
  mSplineData: Spline;
};
