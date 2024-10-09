import { Effect, pipe } from "effect";

import { Unitless } from "~/types";

import {
  type FGBuildableFactory,
  parseFGBuildableFactory,
} from "../FGBuildableFactory";
import type { ParseError } from "../errors";
import { parseFloat } from "../primitives";

import { assertVendorFGBuildableManufacturer } from "./assert";

export function parseFGBuildableManufacturer(
  data: unknown,
): Effect.Effect<FGBuildableManufacturer, ParseError> {
  assertVendorFGBuildableManufacturer(data);

  return pipe(
    Effect.all([
      parseFGBuildableFactory(data),
      pipe(
        Effect.all({
          manufacturingSpeed: parseFloat(data.mManufacturingSpeed).pipe(
            Effect.map(Unitless),
          ),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableManufacturer = FGBuildableFactory & {
  manufacturingSpeed: Unitless;
};
