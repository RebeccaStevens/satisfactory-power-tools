import { Effect, pipe } from "effect";

import { MegaWatt } from "~/types";

import {
  type FGBuildableFactory,
  parseFGBuildableFactory,
} from "../FGBuildableFactory";
import type { ParseError } from "../errors";
import { parseFloat } from "../primitives";

import { assertVendorAbstractFGBuildableGenerator } from "./assert";

export function parseAbstractFGBuildableGenerator(
  data: unknown,
): Effect.Effect<AbstractFGBuildableGenerator, ParseError> {
  assertVendorAbstractFGBuildableGenerator(data);

  return pipe(
    Effect.all([
      parseFGBuildableFactory(data),
      pipe(
        Effect.all({
          powerProduction: parseFloat(data.mPowerProduction).pipe(
            Effect.map(MegaWatt),
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

export type AbstractFGBuildableGenerator = FGBuildableFactory & {
  powerProduction: MegaWatt;
};
