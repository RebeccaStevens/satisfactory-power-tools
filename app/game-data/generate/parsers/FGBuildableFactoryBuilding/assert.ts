import { type VendorFGBuildable, assertVendorFGBuildable } from "~/game-data/generate/parsers/FGBuildable/assert";

export function assertVendorFGBuildableFactoryBuilding(
  data: unknown,
): asserts data is VendorFGBuildableFactoryBuilding {
  assertVendorFGBuildable(data);
}

export type VendorFGBuildableFactoryBuilding = VendorFGBuildable;
