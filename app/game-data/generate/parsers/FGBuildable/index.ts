import { Effect, pipe } from "effect";

import { type FGNamed, parseFGNamed } from "~/game-data/generate/parsers/abstract/FGNamed";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorBoolean, parseVendorString } from "~/game-data/generate/parsers/primitives";

import { assertVendorFGBuildable } from "./assert";

export function parseFGBuildable(data: unknown): Effect.Effect<FGBuildable, ParseError> {
  assertVendorFGBuildable(data);

  return pipe(
    Effect.all([
      parseFGNamed(data),
      pipe(
        Effect.all({
          description: parseVendorString(data.mDescription),
          allowColoring: parseVendorBoolean(data.mAllowColoring),
          allowPatterning: parseVendorBoolean(data.mAllowPatterning),
          managedByLightweightBuildableSubsystem: parseVendorBoolean(data.mManagedByLightweightBuildableSubsystem),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildable = FGNamed & {
  description: string;
  allowColoring: boolean;
  allowPatterning: boolean;
  managedByLightweightBuildableSubsystem: boolean;
};
