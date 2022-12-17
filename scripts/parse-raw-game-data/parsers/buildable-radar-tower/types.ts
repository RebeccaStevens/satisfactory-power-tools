import type { Buildable } from "~/scripts/parse-raw-game-data/parsers";

export type Data = Buildable & {
  mMapText: string;
  mRevealRadius: number;
  mScannableDescriptors: Array<string>;
};
