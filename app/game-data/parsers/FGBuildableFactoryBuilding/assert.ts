import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableFactoryBuilding(
  data: unknown,
): asserts data is VendorFGBuildableFactoryBuilding {
  assertVendorFGBuildable(data);
}

export type VendorFGBuildableFactoryBuilding = VendorFGBuildable;
