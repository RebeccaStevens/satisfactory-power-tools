import type { Buildable } from "~/data/core/parsers";

export type Data = Buildable & {
  mCurrentOutputIndex: number | false;
};
