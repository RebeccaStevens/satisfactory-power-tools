import { Effect, pipe } from "effect";

import { type FGBase, parseFGBase } from "~/game-data/generate/parsers/abstract/FGBase";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGSchematic } from "./assert";

export function parseFGSchematic(data: unknown): Effect.Effect<FGSchematic, ParseError> {
  assertVendorFGSchematic(data);

  return pipe(
    Effect.all([parseFGBase(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGSchematic = FGBase & {};
