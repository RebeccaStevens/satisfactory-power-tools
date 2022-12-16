import type { Buildable } from "~/data/core/parsers";
import type { ResearchState } from "~/data/core/types";

export type Data = Buildable & {
  mOccupiedText: string;
  mCurrentResearchState: ResearchState;
  mSignificanceRange: number;
};
