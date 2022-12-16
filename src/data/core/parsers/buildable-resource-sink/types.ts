import type { BuildableBuilding } from "~/data/core/parsers";

export type Data = BuildableBuilding & {
  mGrinderInterpDuration: number;
  mEngineInterpDuration: number;
  mProcessingTime: number;
  mProducingTimer: number;
};
