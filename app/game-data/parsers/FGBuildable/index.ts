import { Effect, pipe } from "effect";

import {
  type AbstractNamed,
  parseAbstractNamed,
} from "~/game-data/parsers/abstractNamed";
import type { ParseError } from "~/game-data/parsers/errors";
import {
  parseVendorBoolean,
  parseVendorString,
} from "~/game-data/parsers/primitives";

import { assertVendorFGBuildable } from "./assert";

export function parseFGBuildable(
  data: unknown,
): Effect.Effect<FGBuildable, ParseError> {
  assertVendorFGBuildable(data);

  return pipe(
    Effect.all([
      parseAbstractNamed(data),
      pipe(
        Effect.all({
          description: parseVendorString(data.mDescription),
          allowColoring: parseVendorBoolean(data.mAllowColoring),
          allowPatterning: parseVendorBoolean(data.mAllowPatterning),
          managedByLightweightBuildableSubsystem: parseVendorBoolean(
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

export type FGBuildable = AbstractNamed & {
  description: string;
  allowColoring: boolean;
  allowPatterning: boolean;
  managedByLightweightBuildableSubsystem: boolean;
};
