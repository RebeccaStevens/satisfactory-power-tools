import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import type { FuelAmount } from "~/scripts/parse-raw-game-data/types";
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

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assert("mFuelClasses" in data);
  assert("mDefaultFuelClasses" in data);
  assert("mFuel" in data);
  assert("mAvailableFuelClasses" in data);
  assert("mFuelResourceForm" in data);
  assert("mFuelLoadAmount" in data);
  assert("mRequiresSupplementalResource" in data);
  assert("mSupplementalLoadAmount" in data);
  assert("mSupplementalToPowerRatio" in data);
  assert("mIsFullBlast" in data);
  assert("mPowerProduction" in data);
  assert("mLoadPercentage" in data);

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

function parseFuel(values: unknown): FuelAmount[] {
  assert(
    Array.isArray(values),
    `expected type: array, actual type: ${typeof values}`,
  );

  return values.map((value) => {
    assert(isObject(value));
    assert("mFuelClass" in value);
    assert("mSupplementalResourceClass" in value);
    assert("mByproduct" in value);
    assert("mByproductAmount" in value);

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
