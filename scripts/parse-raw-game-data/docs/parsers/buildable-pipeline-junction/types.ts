import type { BuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import type { PipeConnection } from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableBuilding & {
  mRadius: number;
  mFluidBoxVolume: number;
  mPipeConnections: PipeConnection[];
};
