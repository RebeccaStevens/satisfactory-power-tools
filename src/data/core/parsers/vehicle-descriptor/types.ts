import type { BaseItem } from "~/data/core/parsers";
import type { MinMax } from "~/data/core/types";

export type Data = BaseItem &
  (
    | { mInventorySize: number }
    | { mFuelConsumption: number }
    | { mPowerConsumption: MinMax<number> }
    | { mInventorySize: number; mFuelConsumption: number }
    | { mInventorySize: number; mPowerConsumption: MinMax<number> }
  );
