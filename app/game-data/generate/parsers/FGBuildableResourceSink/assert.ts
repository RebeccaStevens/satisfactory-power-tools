import { assert } from "chai";

import type { VendorFGBuildableFactory } from "~/game-data/generate/parsers/FGBuildableFactory/assert";

export function assertVendorFGBuildableResourceSink(data: unknown): asserts data is VendorFGBuildableResourceSink {
  assert(typeof data === "object" && data !== null, "FGBuildableManufacturerVariablePower must be an object");
  assert.isEmpty(
    [
      /* cspell:disable */
      "IsAnimationProducing",
      "EnableTickGrinder",
      "EnableTickEngine",
      "mGrinderInterpDuration",
      "mEngineInterpDuration",
      "mProcessingTime",
      "mProducingTimer",

      /* cspell:enable */
    ].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in FGBuildableManufacturerVariablePower",
  );
}

export type VendorFGBuildableResourceSink = VendorFGBuildableFactory & {
  /* cspell:disable */
  IsAnimationProducing: "False";
  EnableTickGrinder: "False";
  EnableTickEngine: "False";
  mGrinderInterpDuration: "5.000000";
  mEngineInterpDuration: "6.000000";
  mProcessingTime: "3.000000";
  mProducingTimer: "0.000000";

  /* cspell:enable */
};
