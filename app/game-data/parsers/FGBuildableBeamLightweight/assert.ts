import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableBeamLightweight(
  data: unknown,
): asserts data is VendorFGBuildableBeamLightweight {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    ["mSize", "mDefaultLength", "mMaxLength"].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGBuildableAttachmentMerger",
  );
}

export type VendorFGBuildableBeamLightweight = VendorFGBuildable & {
  mSize: string;
  mDefaultLength: string;
  mMaxLength: string;
};
