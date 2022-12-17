import type { ConsumableEquipment } from "~/scripts/parse-raw-game-data/parsers";

export type Data = ConsumableEquipment & {
  mShouldPlayDeactivateSound: boolean;
  mZiplineJumpLaunchVelocity: number;
  mMaxZiplineAngle: number;
  mTraceDistance: number;
  mTraceStartOffset: number;
  mTraceRadius: number;
  mVisualizeTraceDistance: boolean;
  mActiveNoiseFrequency: number;
  mZiplineReattachCooldown: number;
};
