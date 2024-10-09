import { assert } from "chai";

import type { VendorFGBuildableFactory } from "~/game-data/parsers/FGBuildableFactory/assert";

export function assertVendorFGBuildableFrackingActivator(
  data: unknown,
): asserts data is VendorFGBuildableFrackingActivator {
  assert(
    typeof data === "object" && data !== null,
    "FGBuildableFrackingActivator must be an object",
  );
  assert.isEmpty(
    [
      "CurrentPotentialChangedDelegate",
      "ConnectedExtractorCountChangedDelegate",
      "mActivationStartupTime",
      "mActivationStartupTimer",
      "mSatelliteActivationComplete",
      "mSatelliteNodeCount",
      "mConnectedExtractorCount",
      "mDefaultPotentialExtractionPerMinute",
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
    "Missing fields in FGBuildableFrackingActivator",
  );
}

export type VendorFGBuildableFrackingActivator = VendorFGBuildableFactory & {
  CurrentPotentialChangedDelegate: string;
  ConnectedExtractorCountChangedDelegate: string;
  mActivationStartupTime: string;
  mActivationStartupTimer: string;
  mSatelliteActivationComplete: string;
  mSatelliteNodeCount: string;
  mConnectedExtractorCount: string;
  mDefaultPotentialExtractionPerMinute: string;
  mAllowedResourceForms: string;
  mOnlyAllowCertainResources: string;
  mAllowedResources: string;
  mExtractorTypeName: string;
  mTryFindMissingResource: string;
};
