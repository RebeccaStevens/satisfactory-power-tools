import { Effect, pipe } from "effect";

import {
  type FGBuildableFactory,
  parseFGBuildableFactory,
} from "~/game-data/parsers/FGBuildableFactory";
import type { ParseError } from "~/game-data/parsers/errors";
import { parseVendorList } from "~/game-data/parsers/primitives";

import { assertVendorFGBuildableFrackingActivator } from "./assert";

export function parseFGBuildableFrackingActivator(
  data: unknown,
): Effect.Effect<FGBuildableFrackingActivator, ParseError> {
  assertVendorFGBuildableFrackingActivator(data);

  return pipe(
    Effect.all([
      parseFGBuildableFactory(data),
      pipe(
        Effect.all({
          allowedResources: parseVendorList(data.mAllowedResources),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableFrackingActivator = FGBuildableFactory & {
  allowedResources: string[];
};
