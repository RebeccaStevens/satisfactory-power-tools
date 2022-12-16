import type { Buildable } from "~/data/core/parsers";
import type { PowerConnection } from "~/data/core/types";

export type Data = Buildable & {
  mTextRenderers: string;
  bIsSignificant: boolean;
  mMaxCharacters: number;
  mIsSwitchOn: boolean;
  mHasBuildingTag: boolean;
  // mBuildingTag: "";
  mIsBridgeConnected: boolean;
  mConnections: Set<PowerConnection>;
};
