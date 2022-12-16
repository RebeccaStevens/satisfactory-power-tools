import type { BuildableManufacturer } from "~/data/core/parsers";
import type {} from "~/data/core/types";

export type Data = BuildableManufacturer & {
  mSequenceDuration: number;
  mGameTimeAtProducing: number;
  mCurrentProducingSeekTime: number;
  mEstimatedMininumPowerConsumption: number;
  mEstimatedMaximumPowerConsumption: number;
};
