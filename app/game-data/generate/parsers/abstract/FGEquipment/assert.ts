import { assert } from "chai";

import type { VendorFGBase } from "~/game-data/generate/parsers/abstract/FGBase/assert";

export function assertVendorFGEquipment(data: unknown): asserts data is VendorFGEquipment {
  assert(typeof data === "object" && data !== null, "VendorFGEquipment must be an object");
  assert.isEmpty(
    [
      "mEquipmentSlot",
      "mEquipMontage",
      "mHasStingerMontage",
      "mStingerMontage",
      "mUnEquipMontage",
      "mMontageBlendOutTime",
      "mAttachSocket",
      "mComponentNameToFirstPersonMaterials",
      "mNeedsDefaultEquipmentMappingContext",
      "mCostToUse",
      "mArmAnimation",
      "mBackAnimation",
      "mDefaultEquipmentActions",
      "mReceivedDamageModifiers",
      "mSwappedOutThirdPersonMaterials",
      "mEquipmentLookAtDescOverride",
    ].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in VendorFGEquipment",
  );
}

export type VendorFGEquipment = VendorFGBase & {
  mEquipmentSlot: string;
  mEquipMontage: string;
  mHasStingerMontage: string;
  mStingerMontage: string;
  mUnEquipMontage: string;
  mMontageBlendOutTime: string;
  mAttachSocket: string;
  mComponentNameToFirstPersonMaterials: string;
  mNeedsDefaultEquipmentMappingContext: string;
  mCostToUse: string;
  mArmAnimation: string;
  mBackAnimation: string;
  mDefaultEquipmentActions: string;
  mReceivedDamageModifiers: string;
  mSwappedOutThirdPersonMaterials: string;
  mEquipmentLookAtDescOverride: string;
};
