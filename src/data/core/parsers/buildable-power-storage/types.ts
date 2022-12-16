import type { BuildableBuilding } from "~/data/core/parsers";
import type { BatteryStatus } from "~/data/core/types";

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
