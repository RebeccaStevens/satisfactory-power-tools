import { type BaseItem } from "~/scripts/parse-raw-game-data/docs/parsers";
import { type MinMax } from "~/scripts/parse-raw-game-data/types";

export type Data = BaseItem &
  (
    | { mInventorySize: number }
    | { mFuelConsumption: number }
    | { mPowerConsumption: MinMax<number> }
    | { mInventorySize: number; mFuelConsumption: number }
    | { mInventorySize: number; mPowerConsumption: MinMax<number> }
  );
