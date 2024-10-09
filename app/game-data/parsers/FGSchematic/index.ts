import { Effect, pipe } from "effect";

import {
  type AbstractBase,
  parseAbstractBase,
} from "~/game-data/parsers/abstractBase";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGSchematic } from "./assert";

export function parseFGSchematic(
  data: unknown,
): Effect.Effect<FGSchematic, ParseError> {
  assertVendorFGSchematic(data);

  return pipe(
    Effect.all([parseAbstractBase(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGSchematic = AbstractBase & {};
