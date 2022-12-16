import type { Buildable } from "~/data/core/parsers";

export type Data = Buildable & {
  mMaxNumSortRules: number;
  // mLastItem: "(ItemState=())";
  // mItemToLastOutputMap: "()";
  mCurrentOutputIndex: number;
  mLastOutputIndex: number;
  mCurrentInventoryIndex: number;
  // mDistributionTable: "";
};
