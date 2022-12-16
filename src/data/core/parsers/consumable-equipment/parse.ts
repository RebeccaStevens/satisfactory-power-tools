import assert from "node:assert/strict";

import {
  parseBoolean,
  parseString,
  parseEquipmentSlot,
  parseAttachmentSocket,
  parseAmounts,
} from "~/data/core/utils";
import { isObject } from "~/utils/object";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));
  assert(Object.hasOwn(data, "ClassName"));
  assert(Object.hasOwn(data, "mEquipmentSlot"));
  assert(Object.hasOwn(data, "mAttachSocket"));
  assert(Object.hasOwn(data, "mCostToUse"));
  assert(Object.hasOwn(data, "mHasPersistentOwner"));
  assert(Object.hasOwn(data, "mOnlyVisibleToOwner"));
  assert(Object.hasOwn(data, "mUseDefaultPrimaryFire"));

  const conditionalProps = Object.hasOwn(data, "mCanPress")
    ? {
        mCanPress: parseBoolean(data.mCanPress),
      }
    : {};

  return {
    ClassName: parseString(data.ClassName),
    ...conditionalProps,
    mEquipmentSlot: parseEquipmentSlot(data.mEquipmentSlot),
    mAttachSocket: parseAttachmentSocket(data.mAttachSocket),
    mCostToUse: parseAmounts(data.mCostToUse),
    mHasPersistentOwner: parseBoolean(data.mHasPersistentOwner),
    mOnlyVisibleToOwner: parseBoolean(data.mOnlyVisibleToOwner),
    mUseDefaultPrimaryFire: parseBoolean(data.mUseDefaultPrimaryFire),
  };
}
