import type { BaseGasMask } from "~/data/core/types";

export type Data = BaseGasMask & {
  mImmunity: number;
  mIsBurningFuel: boolean;
  mSuit1PMeshMaterials: Set<{
    SlotName: string;
    Material: string;
  }>;
};
