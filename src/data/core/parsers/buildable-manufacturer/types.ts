import type { BuildableBuilding } from "~/data/core/parsers";
import type { PipeConnection, BeltConnection } from "~/data/core/types";

export type Data = BuildableBuilding & {
  mManufacturingSpeed: number;
  mFactoryInputConnections: Set<BeltConnection>;
  mPipeInputConnections: Set<PipeConnection>;
  mFactoryOutputConnections: Set<BeltConnection>;
  mPipeOutputConnections: Set<PipeConnection>;
};
