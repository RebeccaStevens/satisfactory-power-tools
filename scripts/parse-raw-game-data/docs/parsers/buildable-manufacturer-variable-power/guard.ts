import type { BuildableManufacturer } from "~/scripts/parse-raw-game-data/docs/parsers";

import type { Data } from "./types";

export function isVariablePower(data: BuildableManufacturer): data is Data {
  return (
    "mEstimatedMininumPowerConsumption" in data &&
    "mEstimatedMaximumPowerConsumption" in data
  );
}
