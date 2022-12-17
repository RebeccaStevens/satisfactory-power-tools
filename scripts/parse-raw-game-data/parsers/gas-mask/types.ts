import type { BaseGasMask } from "~/scripts/parse-raw-game-data/parsers";

export type Data = BaseGasMask & {
  mPostProcessEnabled: boolean;
  mIsInPoisonArea: boolean;
};
