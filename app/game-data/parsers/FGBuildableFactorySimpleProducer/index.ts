import { Effect, pipe } from "effect";

import { Second } from "~/types";

import {
  type FGBuildableFactory,
  parseFGBuildableFactory,
} from "../FGBuildableFactory";
import type { ParseError } from "../errors";
import { parseFloat } from "../primitives";

import { assertVendorFGBuildableFactorySimpleProducer } from "./assert";

export function parseFGBuildableFactorySimpleProducer(
  data: unknown,
): Effect.Effect<FGBuildableFactorySimpleProducer, ParseError> {
  assertVendorFGBuildableFactorySimpleProducer(data);

  return pipe(
    Effect.all([
      parseFGBuildableFactory(data),
      pipe(
        Effect.all({
          timeToProduceItem: parseFloat(data.mTimeToProduceItem).pipe(
            Effect.map(Second),
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

export type FGBuildableFactorySimpleProducer = FGBuildableFactory & {
  timeToProduceItem: Second;
};
