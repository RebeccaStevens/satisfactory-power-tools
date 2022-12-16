import type { Buildable } from "~/data/core/parsers";
import type { Rotation3D, Translation3D } from "~/data/core/types";

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
