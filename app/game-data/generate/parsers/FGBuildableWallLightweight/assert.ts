import { type VendorFGBuildable, assertVendorFGBuildable } from "~/game-data/generate/parsers/FGBuildable/assert";

export function assertVendorFGBuildableWallLightweight(
  data: unknown,
): asserts data is VendorFGBuildableWallLightweight {
  assertVendorFGBuildable(data);
}

export type VendorFGBuildableWallLightweight = VendorFGBuildable;
