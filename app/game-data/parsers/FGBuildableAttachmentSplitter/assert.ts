import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableAttachmentSplitter(
  data: unknown,
): asserts data is VendorFGBuildableAttachmentSplitter {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    ["mCurrentOutputIndex", "mInventorySize"].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGBuildableAttachmentSplitter",
  );
}

export type VendorFGBuildableAttachmentSplitter = VendorFGBuildable & {
  mCurrentOutputIndex: string;
  mInventorySize: string;
};
