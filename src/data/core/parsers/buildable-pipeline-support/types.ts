import type { Buildable } from "~/data/core/parsers";

export type Data = Buildable & {
  mLength: number;
  mVerticalAngle: number;
  mUseStaticHeight: boolean;
  mCanStack: boolean;
  mStackHeight: number;
};
