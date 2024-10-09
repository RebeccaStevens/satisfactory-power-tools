import { assert } from "chai";

import type { VendorFGBuildableFactory } from "~/game-data/parsers/FGBuildableFactory/assert";

export function assertVendorFGBuildableResourceExtractor(
  data: unknown,
): asserts data is VendorFGBuildableResourceExtractor {
  assert(
    typeof data === "object" && data !== null,
    "FGBuildableManufacturerVariablePower must be an object",
  );
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
    ].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGBuildableManufacturerVariablePower",
  );
}

export type VendorFGBuildableResourceExtractor = VendorFGBuildableFactory & {
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
