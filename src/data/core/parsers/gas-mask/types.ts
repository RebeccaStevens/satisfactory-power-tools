import type { BaseGasMask } from "~/data/core/parsers";

export type Data = BaseGasMask & {
  mPostProcessEnabled: boolean;
  mIsInPoisonArea: boolean;
};
