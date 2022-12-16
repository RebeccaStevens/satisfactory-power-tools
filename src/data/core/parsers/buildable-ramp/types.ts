import type { BuildableFoundation } from "~/data/core/parsers";

export type Data = BuildableFoundation & {
  mIsDoubleRamp: boolean;
  mIsRoof: boolean;
};
