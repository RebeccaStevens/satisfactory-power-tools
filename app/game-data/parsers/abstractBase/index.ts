import { Effect } from "effect";

import type { ParseError } from "~/game-data/parsers/errors";
import { parseVendorString } from "~/game-data/parsers/primitives";

import { assertVendorAbstractBase } from "./assert";

export function parseAbstractBase(
  data: unknown,
): Effect.Effect<AbstractBase, ParseError> {
  assertVendorAbstractBase(data);

  return Effect.all({
    className: parseVendorString(data.ClassName),
  });
}

export type AbstractBase = {
  className: string;
};
