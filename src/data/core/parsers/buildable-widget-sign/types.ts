import type { Buildable } from "~/data/core/parsers";
import type { Color, Point2D, Point3D } from "~/data/core/types";

export type Data = Buildable & {
  mGainSignificanceDistance: number;
  // mPrefabTextElementSaveData: "";
  // mPrefabIconElementSaveData: "";
  mForegroundColor: Color;
  mBackgroundColor: Color;
  mAuxilaryColor: Color;
  mEmissive: number;
  mGlossiness: number;
  mDataVersion: number;
  // mSignPoles: "";
  mWorldDimensions: Point2D;
  mPoleOffset: Point3D;
  mPoleScale: Point2D;
  mSignToSignOffset: number;
};
