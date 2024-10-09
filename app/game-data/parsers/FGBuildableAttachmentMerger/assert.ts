import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableAttachmentMerger(
  data: unknown,
): asserts data is VendorFGBuildableAttachmentMerger {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    ["mCurrentInputIndex", "mInventorySize"].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGBuildableAttachmentMerger",
  );
}

export type VendorFGBuildableAttachmentMerger = VendorFGBuildable & {
  mCurrentInputIndex: string;
  mInventorySize: string;
};
