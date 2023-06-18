import {
  type Base,
  type Item,
} from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  type AttachmentSocket,
  type EquipmentSlot,
} from "~/scripts/parse-raw-game-data/types";

export type Data = Base & {
  mCanPress?: boolean;
  mEquipmentSlot: EquipmentSlot;
  mAttachSocket: AttachmentSocket | null;
  mCostToUse: Record<Item["ClassName"], number>;
  mHasPersistentOwner: boolean;
  mOnlyVisibleToOwner: boolean;
};
