import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/data/core/parsers";
import type { FuelAmount } from "~/data/core/types";
import {
  parseNumber,
  parseBoolean,
  parseResourceForm,
  parseClasses,
  parseString,
  parseNullableNumber,
  parseNullableString,
} from "~/data/core/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableBuilding = parseBuildableBuilding(data);

  assert(Object.hasOwn(data, "mFuelClasses"));
  assert(Object.hasOwn(data, "mDefaultFuelClasses"));
  assert(Object.hasOwn(data, "mFuel"));
  assert(Object.hasOwn(data, "mAvailableFuelClasses"));
  assert(Object.hasOwn(data, "mFuelResourceForm"));
  assert(Object.hasOwn(data, "mFuelLoadAmount"));
  assert(Object.hasOwn(data, "mRequiresSupplementalResource"));
  assert(Object.hasOwn(data, "mSupplementalLoadAmount"));
  assert(Object.hasOwn(data, "mSupplementalToPowerRatio"));
  assert(Object.hasOwn(data, "mIsFullBlast"));
  assert(Object.hasOwn(data, "mPowerProduction"));
  assert(Object.hasOwn(data, "mLoadPercentage"));

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

function parseFuel(values: unknown): Set<FuelAmount> {
  assert(
    Array.isArray(values),
    `expected type: array, actual type: ${typeof values}`,
  );

  return new Set(
    values.map((value) => {
      assert(isObject(value));
      assert(Object.hasOwn(value, "mFuelClass"));
      assert(Object.hasOwn(value, "mSupplementalResourceClass"));
      assert(Object.hasOwn(value, "mByproduct"));
      assert(Object.hasOwn(value, "mByproductAmount"));

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
    }),
  );
}
