import { type Buildable } from "~/scripts/parse-raw-game-data/docs/parsers";

export type Data = Buildable & {
  mIsEnabled: boolean;
  mLightControlData: {
    Intensity: number;
  };
  mPowerConsumption: number;
  mHasPower: boolean;
  mIsDay: boolean;
};
