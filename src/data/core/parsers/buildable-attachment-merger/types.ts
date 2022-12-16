import type { Buildable } from "~/data/core/parsers";

export type Data = Buildable & {
  mCurrentInputIndex: number | false;
};
