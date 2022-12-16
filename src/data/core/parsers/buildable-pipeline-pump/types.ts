import type { BuildableBuilding } from "~/data/core/parsers";
import type { PipeConnection } from "~/data/core/types";

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
  mPipeConnections: Set<PipeConnection>;
};
