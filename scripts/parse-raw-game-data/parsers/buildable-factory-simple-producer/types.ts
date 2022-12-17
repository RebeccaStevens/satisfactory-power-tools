import type { BuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import type { GameEvent } from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableBuilding & {
  mTimeToProduceItem: number;
  mEventType: GameEvent;
};
