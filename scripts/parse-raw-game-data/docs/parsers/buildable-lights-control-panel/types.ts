import type { Buildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import type {
  LightControlData,
  PowerConnection,
} from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mIsEnabled: boolean;
  mLightControlData: LightControlData;
  // mControlledBuildables: "";
  mIsBridgeConnected: boolean;
  mConnections: PowerConnection[];
};
