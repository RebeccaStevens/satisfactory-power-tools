import type { BuildableWall } from "~/scripts/parse-raw-game-data/parsers";

export type Data = BuildableWall & {
  mCanBeLocked: boolean;
  mAnimationRate: number;
  mMovementRate: number;
};
