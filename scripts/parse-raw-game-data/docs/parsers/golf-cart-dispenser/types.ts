import type { ConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";

export type Data = ConsumableEquipment & {
  mMaxSpawnDistance: number;
  mSpawningClearance: number;
  mBuildDisqualifierText: string;
  canDisplayDisqualifier: boolean;
  mPlaceDistanceMax: number;
};
