import { Effect, pipe } from "effect";

import { ItemUnit } from "~/types";

import {
  type FGItemDescriptor,
  parseFGItemDescriptor,
} from "../FGItemDescriptor";
import type { ParseError } from "../errors";
import { parseInt, parseString } from "../primitives";

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
          spentFuelClass: parseString(data.mSpentFuelClass),
          amountOfWaste: parseInt(data.mAmountOfWaste).pipe(
            Effect.map(ItemUnit),
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

export type FGItemDescriptorNuclearFuel = FGItemDescriptor & {
  spentFuelClass: string;
  amountOfWaste: ItemUnit;
};
