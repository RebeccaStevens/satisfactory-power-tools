import { assert } from "chai";

import type { VendorFGBuildableFactory } from "~/game-data/generate/parsers/FGBuildableFactory/assert";

export function assertVendorFGBuildableManufacturer(data: unknown): asserts data is VendorFGBuildableManufacturer {
  assert(typeof data === "object" && data !== null, "FGBuildableManufacturer must be an object");
  assert.isEmpty(
    [
      "mCurrentRecipeChanged",
      "mManufacturingSpeed",
      "mFactoryInputConnections",
      "mPipeInputConnections",
      "mFactoryOutputConnections",
      "mPipeOutputConnections",
    ].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in FGBuildableManufacturer",
  );
}

export type VendorFGBuildableManufacturer = VendorFGBuildableFactory & {
  IsPowered?: string;
  mProductionEffectsRunning?: string;
  mCurrentRecipeChanged: string;
  mManufacturingSpeed: string;
  mFactoryInputConnections: string;
  mPipeInputConnections: string;
  mFactoryOutputConnections: string;
  mPipeOutputConnections: string;
};
