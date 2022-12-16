import type { ConsumanleEquipment } from "~/data/core/types";

export type Data = ConsumanleEquipment & {
  mMaxSpawnDistance: number;
  mSpawningClearance: number;
  mBuildDisqualifierText: string;
  canDisplayDisqualifier: boolean;
  mPlaceDistanceMax: number;
};
