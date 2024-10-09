import { assert } from "chai";

import type { VendorAbstractBase } from "~/game-data/parsers/abstractBase/assert";

export function assertVendorAbstractEquipment(
  data: unknown,
): asserts data is VendorAbstractEquipment {
  assert(
    typeof data === "object" && data !== null,
    "VendorAbstractEquipment must be an object",
  );
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
    ].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in VendorAbstractEquipment",
  );
}

export type VendorAbstractEquipment = VendorAbstractBase & {
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
