import type { Buildable } from "~/data/core/parsers";
import type { Point3D } from "~/data/core/types";

export type Data = Buildable & {
  mSize: Point3D;
  mIsSupport: boolean;
};
