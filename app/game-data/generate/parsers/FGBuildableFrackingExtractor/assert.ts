import { assert } from "chai";

import type { VendorFGBuildableFactory } from "~/game-data/generate/parsers/FGBuildableFactory/assert";

export function assertVendorFGBuildableFrackingExtractor(
  data: unknown,
): asserts data is VendorFGBuildableFrackingExtractor {
  assert(typeof data === "object" && data !== null, "FGBuildableFrackingExtractor must be an object");
  assert.isEmpty(
    [
      "mExtractStartupTime",
      "mExtractStartupTimer",
      "mExtractCycleTime",
      "mItemsPerCycle",
      "mPipeOutputConnections",
      "mAllowedResourceForms",
      "mOnlyAllowCertainResources",
      "mAllowedResources",
      "mExtractorTypeName",
      "mTryFindMissingResource",
    ].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in FGBuildableFrackingExtractor",
  );
}

export type VendorFGBuildableFrackingExtractor = VendorFGBuildableFactory & {
  mExtractStartupTime: string;
  mExtractStartupTimer: string;
  mExtractCycleTime: string;
  mItemsPerCycle: string;
  mPipeOutputConnections: string;
  mAllowedResourceForms: string;
  mOnlyAllowCertainResources: string;
  mAllowedResources: string;
  mExtractorTypeName: string;
  mTryFindMissingResource: string;
};
