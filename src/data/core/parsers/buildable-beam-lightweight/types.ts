import type { Buildable } from "~/data/core/parsers";

export type Data = Buildable & {
  mSize: number;
  mDefaultLength: number;
  mMaxLength: number;
  mLength: number;
};
