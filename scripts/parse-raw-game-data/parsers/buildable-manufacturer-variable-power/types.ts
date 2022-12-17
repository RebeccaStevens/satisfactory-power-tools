import type { BuildableManufacturer } from "~/scripts/parse-raw-game-data/parsers";
import type {} from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableManufacturer & {
  mSequenceDuration: number;
  mGameTimeAtProducing: number;
  mCurrentProducingSeekTime: number;
  mEstimatedMininumPowerConsumption: number;
  mEstimatedMaximumPowerConsumption: number;
};
