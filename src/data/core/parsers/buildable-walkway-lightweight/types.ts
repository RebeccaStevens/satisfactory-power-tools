import type { Buildable } from "~/data/core/parsers";

export type Data = Buildable & {
  mSize: number;
  mElevation: number;
};
