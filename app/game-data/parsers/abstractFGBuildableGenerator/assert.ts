import { assert } from "chai";

import type { VendorFGBuildableFactory } from "~/game-data/parsers/FGBuildableFactory/assert";

export function assertVendorAbstractFGBuildableGenerator(
  data: unknown,
): asserts data is VendorAbstractFGBuildableGenerator {
  assert(
    typeof data === "object" && data !== null,
    "AbstractFGBuildableGenerator must be an object",
  );
  assert.isEmpty(
    ["mPowerProduction", "mLoadPercentage"].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in AbstractFGBuildableGenerator",
  );
}

export type VendorAbstractFGBuildableGenerator = VendorFGBuildableFactory & {
  mPowerProduction: string;
  mLoadPercentage: string;
};
