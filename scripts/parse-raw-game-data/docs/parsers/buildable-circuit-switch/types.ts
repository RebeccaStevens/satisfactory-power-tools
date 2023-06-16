import { type Buildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { type PowerConnection } from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mTextRenderers: string;
  bIsSignificant: boolean;
  mMaxCharacters: number;
  mIsSwitchOn: boolean;
  mHasBuildingTag: boolean;
  // mBuildingTag: "";
  mIsBridgeConnected: boolean;
  mConnections: PowerConnection[];
};
