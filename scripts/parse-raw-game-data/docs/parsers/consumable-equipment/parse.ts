import assert from "node:assert/strict";

import { parseBase } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseBoolean,
  parseEquipmentSlot,
  parseAttachmentSocket,
  parseAmounts,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const base = parseBase(data);

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
    ...base,
    ...conditionalProps,
    mEquipmentSlot: parseEquipmentSlot(data.mEquipmentSlot),
    mAttachSocket: parseAttachmentSocket(data.mAttachSocket),
    mCostToUse: parseAmounts(data.mCostToUse),
    mHasPersistentOwner: parseBoolean(data.mHasPersistentOwner),
    mOnlyVisibleToOwner: parseBoolean(data.mOnlyVisibleToOwner),
    mUseDefaultPrimaryFire: parseBoolean(data.mUseDefaultPrimaryFire),
  };
}
