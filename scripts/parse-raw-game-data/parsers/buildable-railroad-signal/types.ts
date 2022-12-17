import type { Buildable } from "~/scripts/parse-raw-game-data/parsers";
import type {
  RailroadAspect,
  RailroadConnection,
  RailroadBlockValidation,
} from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mGuardedConnections: Array<RailroadConnection>;
  mObservedConnections: Array<RailroadConnection>;
  mAspect: RailroadAspect;
  mBlockValidation: RailroadBlockValidation;
  mIsPathSignal: boolean;
  mIsBiDirectional: boolean;
  mVisualState: number;
};
