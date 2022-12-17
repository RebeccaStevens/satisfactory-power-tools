import type { Buildable } from "~/scripts/parse-raw-game-data/parsers";
import type { RailroadConnection } from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mMeshLength: number;
  mConnections: Array<RailroadConnection>;
  mIsOwnedByPlatform: boolean;
  mTrackGraphID: number | false;
  // mOverlappingTracks: "";
  // mVehicles: "()";
  mSignalBlockID: number;
};
