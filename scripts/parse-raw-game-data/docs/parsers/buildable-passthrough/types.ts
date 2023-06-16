import { type Buildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  type Rotation3D,
  type Translation3D,
} from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mSnappedBuildingThickness: number;
  mMidMeshLength: number;
  mGenerateTunnelCollision: boolean;
  mEndCapRotation: Rotation3D;
  mMidMeshRotation: Rotation3D;
  mEndCapTranslation: Translation3D;
  mClearanceHeightMin: number;
  mClearanceThickness: number;
  mUseSoftClearance: boolean;
};
