import { Effect, pipe } from "effect";

import { type FGEquipment, parseFGEquipment } from "~/game-data/generate/parsers/abstract/FGEquipment";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorFloat } from "~/game-data/generate/parsers/primitives";

import { assertVendorFGChainsaw } from "./assert";

export function parseFGChainsaw(data: unknown): Effect.Effect<FGChainsaw, ParseError> {
  assertVendorFGChainsaw(data);

  return pipe(
    Effect.all([
      parseFGEquipment(data),
      pipe(
        Effect.all({
          energyConsumption: parseVendorFloat(data.mEnergyConsumption),
          sawDownTreeTime: parseVendorFloat(data.mSawDownTreeTime),
          collateralPickupRadius: parseVendorFloat(data.mCollateralPickupRadius),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGChainsaw = FGEquipment & {
  energyConsumption: number;
  sawDownTreeTime: number;
  collateralPickupRadius: number;
};
