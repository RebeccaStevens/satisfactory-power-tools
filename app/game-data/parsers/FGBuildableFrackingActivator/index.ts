import { Effect, pipe } from "effect";

import {
  type FGBuildableFactory,
  parseFGBuildableFactory,
} from "../FGBuildableFactory";
import type { ParseError } from "../errors";
import { parseList } from "../primitives";

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
          allowedResources: parseList(data.mAllowedResources),
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
