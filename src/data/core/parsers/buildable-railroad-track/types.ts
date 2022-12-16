import type { Buildable } from "~/data/core/parsers";
import type { RailroadConnection } from "~/data/core/types";

export type Data = Buildable & {
  mMeshLength: number;
  mConnections: Set<RailroadConnection>;
  mIsOwnedByPlatform: boolean;
  mTrackGraphID: number | false;
  // mOverlappingTracks: "";
  // mVehicles: "()";
  mSignalBlockID: number;
};
