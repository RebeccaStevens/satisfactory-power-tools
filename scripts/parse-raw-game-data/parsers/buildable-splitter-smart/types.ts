import type { Buildable } from "~/scripts/parse-raw-game-data/parsers";

export type Data = Buildable & {
  mMaxNumSortRules: number;
  // mLastItem: "(ItemState=())";
  // mItemToLastOutputMap: "()";
  mCurrentOutputIndex: number;
  mLastOutputIndex: number;
  mCurrentInventoryIndex: number;
  // mDistributionTable: "";
};
