import type { Item } from "~/scripts/parse-raw-game-data/docs/parsers";
import type { Color } from "~/scripts/parse-raw-game-data/types";

export type Data = Item & {
  mDecalSize: number;
  mPingColor: Color;
  mCollectSpeedMultiplier: number;
  mManualMiningAudioName: string;
};
