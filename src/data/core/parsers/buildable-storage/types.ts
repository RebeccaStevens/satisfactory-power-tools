import type { BuildableBuilding } from "~/data/core/parsers";

export type Data = BuildableBuilding & {
  mStackingHeight: number;
  mInventorySizeX: number;
  mInventorySizeY: number;
};
