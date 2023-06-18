import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
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

  assertPropertyExists(data, "mEquipmentSlot");
  assertPropertyExists(data, "mAttachSocket");
  assertPropertyExists(data, "mCostToUse");
  assertPropertyExists(data, "mHasPersistentOwner");
  assertPropertyExists(data, "mOnlyVisibleToOwner");

  const conditionalProps =
    "mCanPress" in data
      ? {
          mCanPress:
            (assertPropertyExists(data, "mCanPress"),
            parseBoolean(data.mCanPress)),
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
  };
}
