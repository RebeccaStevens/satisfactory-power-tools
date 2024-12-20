import { Effect, pipe } from "effect";

import {
  type AbstractFGBuildableGenerator,
  parseAbstractFGBuildableGenerator,
} from "~/game-data/generate/parsers/abstract/FGBuildableGenerator";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import {
  parseVendorBoolean,
  parseVendorFloat,
  parseVendorInt,
  parseVendorIntNullable,
  parseVendorList,
  parseVendorString,
  parseVendorStringNullable,
} from "~/game-data/generate/parsers/primitives";

import { assertVendorFGBuildableGeneratorFuel } from "./assert";

export function parseFGBuildableGeneratorFuel(data: unknown): Effect.Effect<FGBuildableGeneratorFuel, ParseError> {
  assertVendorFGBuildableGeneratorFuel(data);

  return pipe(
    Effect.all([
      parseAbstractFGBuildableGenerator(data),
      pipe(
        Effect.all({
          fuelClasses: parseVendorList(data.mDefaultFuelClasses),
          fuel: pipe(
            data.mFuel,
            Effect.forEach((fuel) =>
              Effect.all({
                fuelClass: parseVendorString(fuel.mFuelClass),
                supplementalResourceClass: parseVendorString(fuel.mSupplementalResourceClass),
                byproduct: parseVendorStringNullable(fuel.mByproduct),
                byproductAmount: parseVendorIntNullable(fuel.mByproductAmount),
              }),
            ),
          ),
          fuelLoadAmount: parseVendorInt(data.mFuelLoadAmount),
          requiresSupplementalResource: parseVendorBoolean(data.mRequiresSupplementalResource),
          supplementalLoadAmount: parseVendorInt(data.mSupplementalLoadAmount),
          supplementalToPowerRatio: parseVendorFloat(data.mSupplementalToPowerRatio),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableGeneratorFuel = AbstractFGBuildableGenerator & {
  fuelClasses: string[];
  fuel: Array<{
    fuelClass: string;
    supplementalResourceClass: string | null;
    byproduct: string | null;
    byproductAmount: number | null;
  }>;
  fuelLoadAmount: number;
  requiresSupplementalResource: boolean;
  supplementalLoadAmount: number | null;
  supplementalToPowerRatio: number;
};
