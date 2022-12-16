import type { Item } from "~/data/core/parsers";
import type { AttachmentSocket, EquipmentSlot } from "~/data/core/types";

export type Data = {
  ClassName: string;
  mCanPress?: boolean;
  mEquipmentSlot: EquipmentSlot;
  mAttachSocket: AttachmentSocket | null;
  mCostToUse: Map<Item["ClassName"], number>;
  mHasPersistentOwner: boolean;
  mOnlyVisibleToOwner: boolean;
  mUseDefaultPrimaryFire: boolean;
};
