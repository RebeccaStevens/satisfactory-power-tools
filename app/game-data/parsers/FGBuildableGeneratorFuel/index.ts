import { Effect, pipe } from "effect";

import { ItemUnit } from "~/types";

import {
  type AbstractFGBuildableGenerator,
  parseAbstractFGBuildableGenerator,
} from "../abstractFGBuildableGenerator";
import type { ParseError } from "../errors";
import {
  parseBoolean,
  parseFloat,
  parseInt,
  parseIntNullable,
  parseList,
  parseString,
  parseStringNullable,
} from "../primitives";

import { assertVendorFGBuildableGeneratorFuel } from "./assert";

export function parseFGBuildableGeneratorFuel(
  data: unknown,
): Effect.Effect<FGBuildableGeneratorFuel, ParseError> {
  assertVendorFGBuildableGeneratorFuel(data);

  return pipe(
    Effect.all([
      parseAbstractFGBuildableGenerator(data),
      pipe(
        Effect.all({
          fuelClasses: parseList(data.mDefaultFuelClasses),
          fuel: pipe(
            data.mFuel,
            Effect.forEach((fuel) =>
              Effect.all({
                fuelClass: parseString(fuel.mFuelClass),
                supplementalResourceClass: parseString(
                  fuel.mSupplementalResourceClass,
                ),
                byproduct: parseStringNullable(fuel.mByproduct),
                byproductAmount: parseIntNullable(fuel.mByproductAmount).pipe(
                  Effect.map((amount) =>
                    amount === null ? null : ItemUnit(amount),
                  ),
                ),
              }),
            ),
          ),
          fuelLoadAmount: parseInt(data.mFuelLoadAmount).pipe(
            Effect.map(ItemUnit),
          ),
          requiresSupplementalResource: parseBoolean(
            data.mRequiresSupplementalResource,
          ),
          supplementalLoadAmount: parseInt(data.mSupplementalLoadAmount).pipe(
            Effect.map(ItemUnit),
          ),
          supplementalToPowerRatio: parseFloat(data.mSupplementalToPowerRatio),
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
    supplementalResourceClass: string;
    byproduct: string | null;
    byproductAmount: ItemUnit | null;
  }>;
  fuelLoadAmount: ItemUnit;
  requiresSupplementalResource: boolean;
  supplementalLoadAmount: ItemUnit;
  supplementalToPowerRatio: number;
};
