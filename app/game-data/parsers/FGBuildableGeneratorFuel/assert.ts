import { assert } from "chai";
import { Array } from "effect";

import {
  type VendorAbstractFGBuildableGenerator,
  assertVendorAbstractFGBuildableGenerator,
} from "~/game-data/parsers/abstractFGBuildableGenerator/assert";

export function assertVendorFGBuildableGeneratorFuel(
  data: unknown,
): asserts data is VendorFGBuildableGeneratorFuel {
  assertVendorAbstractFGBuildableGenerator(data);

  assert.isEmpty(
    [
      "mFuelClasses",
      "mDefaultFuelClasses",
      "mAvailableFuelClasses",
      "mFuelClassesInInventory",
      "mFuelLoadAmount",
      "mRequiresSupplementalResource",
      "mSupplementalLoadAmount",
      "mSupplementalToPowerRatio",
      "mIsFullBlast",
      "mCachedInputConnections",
      "mCachedPipeInputConnections",
    ].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGBuildableGeneratorFuel",
  );

  assert("mFuel" in data, "mFuel must be defined in FGBuildableGeneratorFuel");
  const { mFuel } = data;

  assert(Array.isArray(mFuel), "mFuel must be an array");

  mFuel.forEach((fuel) => {
    assert(
      typeof fuel === "object" && fuel !== null,
      "mFuel must be an object",
    );
    assert.isEmpty(
      [
        "mFuelClass",
        "mSupplementalResourceClass",
        "mByproduct",
        "mByproductAmount",
      ].filter(
        (field) =>
          !(field in fuel) ||
          typeof (fuel as Record<string, unknown>)[field] !== "string",
      ),
      "Missing fields in FGBuildableGeneratorFuel.mFuel",
    );
  });
}

export type VendorFGBuildableGeneratorFuel =
  VendorAbstractFGBuildableGenerator & {
    m_SFXSockets?: string;
    m_CurrentPotential?: string;
    mFuelClasses: string;
    mDefaultFuelClasses: string;
    mFuel: Array<{
      mFuelClass: string;
      mSupplementalResourceClass: string;
      mByproduct: string;
      mByproductAmount: string;
    }>;
    mAvailableFuelClasses: string;
    mFuelClassesInInventory: string;
    mFuelLoadAmount: string;
    mRequiresSupplementalResource: string;
    mSupplementalLoadAmount: string;
    mSupplementalToPowerRatio: string;
    mIsFullBlast: string;
    mCachedInputConnections: string;
    mCachedPipeInputConnections: string;
  };
