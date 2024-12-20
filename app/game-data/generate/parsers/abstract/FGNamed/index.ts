import { Effect, pipe } from "effect";

import { type FGBase, parseFGBase } from "~/game-data/generate/parsers/abstract/FGBase";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorString } from "~/game-data/generate/parsers/primitives";

import { assertVendorFGNamed } from "./assert";

export function parseFGNamed(data: unknown): Effect.Effect<FGNamed, ParseError> {
  assertVendorFGNamed(data);

  return pipe(
    Effect.all([
      parseFGBase(data),
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

export type FGNamed = FGBase & {
  displayName: string;
};
