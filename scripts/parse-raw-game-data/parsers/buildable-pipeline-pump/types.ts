import type { BuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import type { PipeConnection } from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableBuilding & {
  mLastFlowUpdate: number;
  mUpdateFlowTime: number;
  mAnimSpeed: number;
  mLastFlowValue: number;
  mTimeScaleOffset: number;
  mMaxPressure: number;
  mDesignPressure: number;
  mDefaultFlowLimit: number;
  mUserFlowLimit: number;
  mMinimumFlowPercentForStandby: number;
  mRadius: number;
  mFluidBoxVolume: number;
  mPipeConnections: Array<PipeConnection>;
};
