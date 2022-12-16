import type { Item } from "~/data/core/parsers";
import type { Point3D, Rotation3D } from "~/data/core/types";

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
