import type { BuildableManufacturer } from "~/scripts/parse-raw-game-data/docs/parsers";

import type { Data } from "./types";

export function isVariablePower(data: BuildableManufacturer): data is Data {
  return (
    Object.hasOwn(data, "mEstimatedMininumPowerConsumption") &&
    Object.hasOwn(data, "mEstimatedMaximumPowerConsumption")
  );
}
