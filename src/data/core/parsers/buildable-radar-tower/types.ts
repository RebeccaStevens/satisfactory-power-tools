import type { Buildable } from "~/data/core/parsers";

export type Data = Buildable & {
  mMapText: string;
  mRevealRadius: number;
  mScannableDescriptors: Set<string>;
};
