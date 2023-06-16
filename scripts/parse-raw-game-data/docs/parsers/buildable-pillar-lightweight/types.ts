import { type Buildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { type Point3D } from "~/scripts/parse-raw-game-data/types";

export type Data = Buildable & {
  mSize: Point3D;
  mIsSupport: boolean;
};
