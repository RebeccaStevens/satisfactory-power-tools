import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGPipeHyperStart(
  data: unknown,
): asserts data is VendorFGPipeHyperStart {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGPipeHyperStart",
  );
}

export type VendorFGPipeHyperStart = VendorFGBuildable & {};
