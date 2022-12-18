import type { BaseBuildableFracking } from "~/scripts/parse-raw-game-data/docs/parsers";

export type Data = BaseBuildableFracking & {
  mActivationStartupTime: number;
  mActivationStartupTimer: number;
  mSatelliteActivationComplete: boolean;
  mSatelliteNodeCount: number;
  mConnectedExtractorCount: number;
  mDefaultPotentialExtractionPerMinute: number;
};
