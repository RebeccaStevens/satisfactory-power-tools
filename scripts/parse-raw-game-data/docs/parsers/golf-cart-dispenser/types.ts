import type { ConsumanleEquipment } from "~/scripts/parse-raw-game-data/types";

export type Data = ConsumanleEquipment & {
  mMaxSpawnDistance: number;
  mSpawningClearance: number;
  mBuildDisqualifierText: string;
  canDisplayDisqualifier: boolean;
  mPlaceDistanceMax: number;
};
