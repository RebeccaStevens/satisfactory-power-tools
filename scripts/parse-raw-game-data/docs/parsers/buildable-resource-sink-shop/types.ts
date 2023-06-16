import { type BuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";

export type Data = BuildableBuilding & {
  mShopInventoryDefaultSize: number;
};
