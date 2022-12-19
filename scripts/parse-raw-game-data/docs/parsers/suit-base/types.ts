import type { BaseGasMask } from "~/scripts/parse-raw-game-data/docs/parsers";

export type Data = BaseGasMask & {
  mImmunity: number;
  mIsBurningFuel: boolean;
  mSuit1PMeshMaterials: Array<{
    SlotName: string;
    Material: string;
  }>;
};
