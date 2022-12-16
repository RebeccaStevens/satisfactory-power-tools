import type { BaseBuildable } from "~/data/core/parsers";

export type Data = BaseBuildable & {
  mSize: number;
  mHeight: number;
  mIsInverted: boolean;
};
