import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import { type FuelAmount } from "~/scripts/parse-raw-game-data/types";
import {
  parseNumber,
  parseBoolean,
  parseResourceForm,
  parseClasses,
  parseString,
  parseNullableNumber,
  parseNullableString,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assertPropertyExists(data, "mFuelClasses");
  assertPropertyExists(data, "mDefaultFuelClasses");
  assertPropertyExists(data, "mFuel", "array");
  assertPropertyExists(data, "mAvailableFuelClasses");
  assertPropertyExists(data, "mFuelResourceForm");
  assertPropertyExists(data, "mFuelLoadAmount");
  assertPropertyExists(data, "mRequiresSupplementalResource");
  assertPropertyExists(data, "mSupplementalLoadAmount");
  assertPropertyExists(data, "mSupplementalToPowerRatio");
  assertPropertyExists(data, "mIsFullBlast");
  assertPropertyExists(data, "mPowerProduction");
  assertPropertyExists(data, "mLoadPercentage");

  return {
    ...buildableBuilding,
    mFuelClasses: parseClasses(data.mFuelClasses),
    mDefaultFuelClasses: parseClasses(data.mDefaultFuelClasses),
    mFuel: parseFuel(data.mFuel),
    mAvailableFuelClasses: parseClasses(data.mAvailableFuelClasses),
    mFuelResourceForm: parseResourceForm(data.mFuelResourceForm),
    mFuelLoadAmount: parseNumber(data.mFuelLoadAmount),
    mRequiresSupplementalResource: parseBoolean(
      data.mRequiresSupplementalResource,
    ),
    mSupplementalLoadAmount: parseNumber(data.mSupplementalLoadAmount),
    mSupplementalToPowerRatio: parseNumber(data.mSupplementalToPowerRatio),
    mIsFullBlast: parseBoolean(data.mIsFullBlast),
    mPowerProduction: parseNumber(data.mPowerProduction),
    mLoadPercentage: parseNumber(data.mLoadPercentage),
  };
}

function parseFuel(values: unknown[]): FuelAmount[] {
  return values.map((value) => {
    assert(isObject(value));
    assertPropertyExists(value, "mFuelClass");
    assertPropertyExists(value, "mSupplementalResourceClass");
    assertPropertyExists(value, "mByproduct");
    assertPropertyExists(value, "mByproductAmount");

    const mFuelClass = parseString(value.mFuelClass);
    const mSupplementalResourceClass = parseString(
      value.mSupplementalResourceClass,
    );
    const mByproduct = parseNullableString(value.mByproduct);
    const mByproductAmount = parseNullableNumber(value.mByproductAmount);

    assert(
      (mByproduct === null && mByproductAmount === null) ||
        (typeof mByproduct === "string" &&
          typeof mByproductAmount === "number"),
    );

    return {
      mFuelClass,
      mSupplementalResourceClass,
      mByproduct,
      mByproductAmount,
    } as FuelAmount;
  });
}
