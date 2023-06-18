import { type BuildableCircuitSwitch } from "~/scripts/parse-raw-game-data/docs/parsers";

export type Data = BuildableCircuitSwitch & {
  mPriority: number;
};
