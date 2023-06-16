import assert from "node:assert/strict";

import { parseBase } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseBoolean,
  parseEquipmentSlot,
  parseAttachmentSocket,
  parseAmounts,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const base = parseBase(data);

  assert("mEquipmentSlot" in data);
  assert("mAttachSocket" in data);
  assert("mCostToUse" in data);
  assert("mHasPersistentOwner" in data);
  assert("mOnlyVisibleToOwner" in data);
  assert("mUseDefaultPrimaryFire" in data);

  const conditionalProps =
    "mCanPress" in data
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
