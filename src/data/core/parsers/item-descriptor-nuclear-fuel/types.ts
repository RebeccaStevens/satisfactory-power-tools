import type { Item } from "~/data/core/parsers";

export type Data = Item & {
  mSpentFuelClass: string;
  mAmountOfWaste: number;
};
