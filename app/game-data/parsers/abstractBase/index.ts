import { Effect, pipe } from "effect";

import type { ParseError } from "~/game-data/parsers/errors";
import { parseString } from "~/game-data/parsers/primitives";
import { Id } from "~/types";

import { assertVendorAbstractBase } from "./assert";

export function parseAbstractBase(
  data: unknown,
): Effect.Effect<AbstractBase, ParseError> {
  assertVendorAbstractBase(data);

  return pipe(
    Effect.all({
      id: parseString(data.ClassName).pipe(Effect.map(Id)),
      displayName: parseString(data.mDisplayName),
    }),
  );
}

export type AbstractBase = {
  id: Id;
  displayName: string;
};
