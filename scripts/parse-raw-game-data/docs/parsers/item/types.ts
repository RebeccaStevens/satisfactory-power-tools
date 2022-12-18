import type { BaseItem } from "~/scripts/parse-raw-game-data/docs/parsers";

export type Data = BaseItem & {
  mResourceSinkPoints: number;
};
