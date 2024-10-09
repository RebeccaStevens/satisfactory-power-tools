import { assert } from "chai";

import {
  type VendorFGBuildableGeneratorFuel,
  assertVendorFGBuildableGeneratorFuel,
} from "~/game-data/parsers/FGBuildableGeneratorFuel/assert";

export function assertVendorFGBuildableGeneratorNuclear(
  data: unknown,
): asserts data is VendorFGBuildableGeneratorNuclear {
  assertVendorFGBuildableGeneratorFuel(data);
  assert.isEmpty(
    [
      "mCachedLoadPercentage",
      "mWasteLeftFromCurrentFuel",
      "mCurrentGeneratorNuclearWarning",
    ].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGBuildableGeneratorNuclear",
  );
}

export type VendorFGBuildableGeneratorNuclear =
  VendorFGBuildableGeneratorFuel & {
    mCachedLoadPercentage: string;
    mWasteLeftFromCurrentFuel: string;
    mCurrentGeneratorNuclearWarning: string;
  };
