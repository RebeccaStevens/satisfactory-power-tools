import { type Buildable } from "~/scripts/parse-raw-game-data/docs/parsers";

export type Data = Buildable & {
  mMapText: string;
  mRevealRadius: number;
  mScannableDescriptors: string[];
};
