import { assert } from "chai";

import type { VendorFGBuildableManufacturer } from "~/game-data/generate/parsers/FGBuildableManufacturer/assert";

export function assertVendorFGBuildableManufacturerVariablePower(
  data: unknown,
): asserts data is VendorFGBuildableManufacturerVariablePower {
  assert(typeof data === "object" && data !== null, "FGBuildableManufacturerVariablePower must be an object");
  assert.isEmpty(
    ["mEstimatedMininumPowerConsumption", "mEstimatedMaximumPowerConsumption"].filter(
      (field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGBuildableManufacturerVariablePower",
  );
}

export type VendorFGBuildableManufacturerVariablePower = VendorFGBuildableManufacturer & {
  mEstimatedMininumPowerConsumption: string;
  mEstimatedMaximumPowerConsumption: string;
};
