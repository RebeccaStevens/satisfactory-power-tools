import type { Buildable } from "~/scripts/parse-raw-game-data/parsers";

export type Data = Buildable & {
  mCurrentInputIndex: number | false;
};
