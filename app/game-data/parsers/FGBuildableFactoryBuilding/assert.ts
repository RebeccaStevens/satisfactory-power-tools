import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "../FGBuildable/assert";

export function assertVendorFGBuildableFactoryBuilding(
  data: unknown,
): asserts data is VendorFGBuildableFactoryBuilding {
  assertVendorFGBuildable(data);
}

export type VendorFGBuildableFactoryBuilding = VendorFGBuildable;
