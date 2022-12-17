import type { BuildableFoundation } from "~/scripts/parse-raw-game-data/parsers";

export type Data = BuildableFoundation & {
  mIsDoubleRamp: boolean;
  mIsRoof: boolean;
};
