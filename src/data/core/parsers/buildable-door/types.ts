import type { BuildableWall } from "~/data/core/parsers";

export type Data = BuildableWall & {
  mCanBeLocked: boolean;
  mAnimationRate: number;
  mMovementRate: number;
};
