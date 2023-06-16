import { type Buildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  type RailroadAspect,
  type RailroadConnection,
  type RailroadBlockValidation,
} from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mGuardedConnections: RailroadConnection[];
  mObservedConnections: RailroadConnection[];
  mAspect: RailroadAspect;
  mBlockValidation: RailroadBlockValidation;
  mIsPathSignal: boolean;
  mIsBiDirectional: boolean;
  mVisualState: number;
};
