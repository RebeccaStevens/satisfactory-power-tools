import { assert } from "chai";

import type { VendorFGBuildableFactory } from "~/game-data/parsers/FGBuildableFactory/assert";

export function assertVendorFGBuildableFactorySimpleProducer(
  data: unknown,
): asserts data is VendorFGBuildableFactorySimpleProducer {
  assert(
    typeof data === "object" && data !== null,
    "FGBuildableFactorySimpleProducer must be an object",
  );
  assert.isEmpty(
    ["mTimeToProduceItem", "mEventType"].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGBuildableFactorySimpleProducer",
  );
}

export type VendorFGBuildableFactorySimpleProducer =
  VendorFGBuildableFactory & {
    mTimeToProduceItem: string;
    mEventType: string;
  };
