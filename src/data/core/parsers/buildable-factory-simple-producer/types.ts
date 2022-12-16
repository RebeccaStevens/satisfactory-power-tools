import type { BuildableBuilding } from "~/data/core/parsers";
import type { GameEvent } from "~/data/core/types";

export type Data = BuildableBuilding & {
  mTimeToProduceItem: number;
  mEventType: GameEvent;
};
