import type { Base, Item } from "~/scripts/parse-raw-game-data/parsers";
import type {
  AttachmentSocket,
  EquipmentSlot,
} from "~/scripts/parse-raw-game-data/types";

export type Data = Base & {
  mCanPress?: boolean;
  mEquipmentSlot: EquipmentSlot;
  mAttachSocket: AttachmentSocket | null;
  mCostToUse: Record<Item["ClassName"], number>;
  mHasPersistentOwner: boolean;
  mOnlyVisibleToOwner: boolean;
  mUseDefaultPrimaryFire: boolean;
};
