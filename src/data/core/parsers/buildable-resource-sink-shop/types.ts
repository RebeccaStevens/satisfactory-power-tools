import type { BuildableBuilding } from "~/data/core/parsers";

export type Data = BuildableBuilding & {
  mShopInventoryDefaultSize: number;
};
