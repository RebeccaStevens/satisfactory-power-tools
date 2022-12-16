import type { BaseBuildableFracking } from "~/data/core/parsers";

export type Data = BaseBuildableFracking & {
  mActivationStartupTime: number;
  mActivationStartupTimer: number;
  mSatelliteActivationComplete: boolean;
  mSatelliteNodeCount: number;
  mConnectedExtractorCount: number;
  mDefaultPotentialExtractionPerMinute: number;
};
