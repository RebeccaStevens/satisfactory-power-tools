import type { BuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import type {
  PipeConnection,
  BeltConnection,
} from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableBuilding & {
  mManufacturingSpeed: number;
  mFactoryInputConnections: Array<BeltConnection>;
  mPipeInputConnections: Array<PipeConnection>;
  mFactoryOutputConnections: Array<BeltConnection>;
  mPipeOutputConnections: Array<PipeConnection>;
};
