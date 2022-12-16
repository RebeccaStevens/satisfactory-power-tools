import type { ConsumableEquipment } from "~/data/core/parsers";

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
