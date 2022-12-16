import type { Buildable } from "~/data/core/parsers";
import type {
  RailroadAspect,
  RailroadConnection,
  RailroadBlockValidation,
} from "~/data/core/types";

export type Data = Buildable & {
  mGuardedConnections: Set<RailroadConnection>;
  mObservedConnections: Set<RailroadConnection>;
  mAspect: RailroadAspect;
  mBlockValidation: RailroadBlockValidation;
  mIsPathSignal: boolean;
  mIsBiDirectional: boolean;
  mVisualState: number;
};
