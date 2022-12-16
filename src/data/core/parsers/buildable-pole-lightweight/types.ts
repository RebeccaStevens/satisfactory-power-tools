import type { Buildable } from "~/data/core/parsers";

export type Data = Buildable & {
  mHeight: number;
  mSelectedPoleVersion: number | false;
  mUseStaticHeight: boolean;
  mCanStack: boolean;
  mStackHeight: number;
};
