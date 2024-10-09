import { Effect, pipe } from "effect";

import {
  type FGItemDescriptor,
  parseFGItemDescriptor,
} from "~/game-data/parsers/FGItemDescriptor";
import type { ParseError } from "~/game-data/parsers/errors";
import {
  parseVendorInt,
  parseVendorString,
} from "~/game-data/parsers/primitives";

import { assertVendorFGItemDescriptorNuclearFuel } from "./assert";

export function parseFGItemDescriptorNuclearFuel(
  data: unknown,
): Effect.Effect<FGItemDescriptorNuclearFuel, ParseError> {
  assertVendorFGItemDescriptorNuclearFuel(data);

  return pipe(
    Effect.all([
      parseFGItemDescriptor(data),
      pipe(
        Effect.all({
          spentFuelClass: parseVendorString(data.mSpentFuelClass),
          amountOfWaste: parseVendorInt(data.mAmountOfWaste),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGItemDescriptorNuclearFuel = FGItemDescriptor & {
  spentFuelClass: string;
  amountOfWaste: number;
};
