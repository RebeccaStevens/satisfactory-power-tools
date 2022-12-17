import type { BuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";

export type Data = BuildableBuilding & {
  mGrinderInterpDuration: number;
  mEngineInterpDuration: number;
  mProcessingTime: number;
  mProducingTimer: number;
};
