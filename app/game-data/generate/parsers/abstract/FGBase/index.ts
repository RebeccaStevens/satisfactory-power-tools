import { Effect } from "effect";

import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorString } from "~/game-data/generate/parsers/primitives";

import { assertVendorFGBase } from "./assert";

export function parseFGBase(data: unknown): Effect.Effect<FGBase, ParseError> {
  assertVendorFGBase(data);

  return Effect.all({
    className: parseVendorString(data.ClassName),
  });
}

export type FGBase = {
  className: string;
};
