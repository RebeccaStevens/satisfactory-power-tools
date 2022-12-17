import type { BaseItem } from "~/scripts/parse-raw-game-data/parsers";

export type Data = BaseItem & {
  mResourceSinkPoints: number;
};
