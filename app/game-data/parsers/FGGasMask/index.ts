import { Effect, pipe } from "effect";

import {
  type AbstractEquipment,
  parseAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment";
import type { ParseError } from "~/game-data/parsers/errors";

import { assertVendorFGGasMask } from "./assert";

export function parseFGGasMask(
  data: unknown,
): Effect.Effect<FGGasMask, ParseError> {
  assertVendorFGGasMask(data);

  return pipe(
    Effect.all([parseAbstractEquipment(data), pipe(Effect.all({}))]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGGasMask = AbstractEquipment & {};
