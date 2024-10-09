import { Effect, pipe } from "effect";

import { parseAbstractBase } from "~/game-data/parsers/abstractBase";
import type { ParseError } from "~/game-data/parsers/errors";
import { parseBoolean, parseString } from "~/game-data/parsers/primitives";

import { assertVendorFGBuildable } from "./assert";

export function parseFGBuildable(
  data: unknown,
): Effect.Effect<FGBuildable, ParseError> {
  assertVendorFGBuildable(data);

  return pipe(
    Effect.all([
      parseAbstractBase(data),
      pipe(
        Effect.all({
          description: parseString(data.mDescription),
          allowColoring: parseBoolean(data.mAllowColoring),
          allowPatterning: parseBoolean(data.mAllowPatterning),
          managedByLightweightBuildableSubsystem: parseBoolean(
            data.mManagedByLightweightBuildableSubsystem,
          ),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildable = {
  description: string;
  allowColoring: boolean;
  allowPatterning: boolean;
  managedByLightweightBuildableSubsystem: boolean;
};
