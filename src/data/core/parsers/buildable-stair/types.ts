import type { Buildable } from "~/data/core/parsers";
import type { StairDirection } from "~/data/core/types";

export type Data = Buildable & {
  mStairDirection: StairDirection;
  mHeight: number;
  mSize: number;
};
