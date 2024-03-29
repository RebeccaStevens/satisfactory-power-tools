import { type Buildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { type ResearchState } from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mOccupiedText: string;
  mCurrentResearchState: ResearchState;
  mSignificanceRange: number;
};
