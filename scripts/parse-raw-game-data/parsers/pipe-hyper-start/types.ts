import type { BuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";

export type Data = BuildableBuilding & {
  // mWindDirectionFromTurbine: "()";
  mAudioTimerCounter: number;
  mOpeningOffset: number;
  mInitialMinSpeedFactor: number;
  mLength: number;
  mCanStack: boolean;
  mStackHeight: number;
  mUseStaticHeight: boolean;
};
