import type { Buildable } from "~/data/core/parsers";

export type Data = Buildable & {
  mIsEnabled: boolean;
  mLightControlData: {
    Intensity: number;
  };
  mPowerConsumption: number;
  mHasPower: boolean;
  mIsDay: boolean;
};
