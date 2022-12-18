import type { BuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import type {
  PipeConnection,
  BeltConnection,
} from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableBuilding & {
  mManufacturingSpeed: number;
  mFactoryInputConnections: BeltConnection[];
  mPipeInputConnections: PipeConnection[];
  mFactoryOutputConnections: BeltConnection[];
  mPipeOutputConnections: PipeConnection[];
};
