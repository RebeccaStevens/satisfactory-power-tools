import type { BuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import type { BatteryStatus } from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableBuilding & {
  m_PreviousBatteryStatus: BatteryStatus;
  mCurrentGameTimeSinceStateChange: number;
  mActivationEventID: number;
  mBatteryStatus: BatteryStatus;
  mPowerStore: number;
  mPowerStoreCapacity: number;
  mPowerInputCapacity: number;
  mIndicatorLevelMax: number;
  mIndicatorLevel: number;
};
