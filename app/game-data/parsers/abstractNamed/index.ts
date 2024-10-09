import { Effect, pipe } from "effect";

import {
  type AbstractBase,
  parseAbstractBase,
} from "~/game-data/parsers/abstractBase";
import type { ParseError } from "~/game-data/parsers/errors";
import { parseVendorString } from "~/game-data/parsers/primitives";

import { assertVendorAbstractNamed } from "./assert";

export function parseAbstractNamed(
  data: unknown,
): Effect.Effect<AbstractNamed, ParseError> {
  assertVendorAbstractNamed(data);

  return pipe(
    Effect.all([
      parseAbstractBase(data),
      pipe(
        Effect.all({
          displayName: parseVendorString(data.mDisplayName),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type AbstractNamed = AbstractBase & {
  displayName: string;
};
