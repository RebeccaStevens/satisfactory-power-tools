import type { Buildable } from "~/data/core/parsers";
import type { LightControlData, PowerConnection } from "~/data/core/types";

export type Data = Buildable & {
  mIsEnabled: boolean;
  mLightControlData: LightControlData;
  // mControlledBuildables: "";
  mIsBridgeConnected: boolean;
  mConnections: Set<PowerConnection>;
};
