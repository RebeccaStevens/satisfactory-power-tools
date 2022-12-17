import type { Item } from "~/scripts/parse-raw-game-data/parsers";
import type { Point3D, Rotation3D } from "~/scripts/parse-raw-game-data/types";

export type Data = Item &
  (
    | {
        mHealthGain: number;
      }
    | {
        mCustomHandsMeshScale: number;
      }
  ) & {
    mCustomHandsMeshScale: number;
    mCustomRotation: Rotation3D;
    mCustomLocation: Point3D;
  };
