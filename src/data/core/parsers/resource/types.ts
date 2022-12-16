import type { Item } from "~/data/core/parsers";
import type { Color } from "~/data/core/types";

export type Data = Item & {
  mDecalSize: number;
  mPingColor: Color;
  mCollectSpeedMultiplier: number;
  mManualMiningAudioName: string;
};
