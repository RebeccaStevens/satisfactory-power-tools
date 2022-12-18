import type { Item } from "~/scripts/parse-raw-game-data/docs/parsers";

export type Data = Item & {
  mSpentFuelClass: string;
  mAmountOfWaste: number;
};
