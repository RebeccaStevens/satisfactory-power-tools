import { Effect, pipe } from "effect";

import {
  type FGBuildableFactory,
  parseFGBuildableFactory,
} from "~/game-data/parsers/FGBuildableFactory";
import type { ParseError } from "~/game-data/parsers/errors";
import { parseVendorFloat } from "~/game-data/parsers/primitives";

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
          timeToProduceItem: parseVendorFloat(data.mTimeToProduceItem),
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
  timeToProduceItem: number;
};
