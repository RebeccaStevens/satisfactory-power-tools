import { type Buildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  type Color,
  type Point2D,
  type Point3D,
} from "~/scripts/parse-raw-game-data/types";

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
