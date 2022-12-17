import type { BuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";

export type Data = BuildableBuilding & {
  mShopInventoryDefaultSize: number;
};
