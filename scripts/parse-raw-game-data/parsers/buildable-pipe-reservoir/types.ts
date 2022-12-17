import type { BuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import type { PipeConnection } from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableBuilding & {
  mStackingHeight: number;
  mStorageCapacity: number;
  mPipeConnections: Array<PipeConnection>;
};
