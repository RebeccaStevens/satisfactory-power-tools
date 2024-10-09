import { Effect, pipe } from "effect";

import {
  type AbstractEquipment,
  parseAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment";
import type { ParseError } from "~/game-data/parsers/errors";
import { parseVendorFloat } from "~/game-data/parsers/primitives";

import { assertVendorFGChainsaw } from "./assert";

export function parseFGChainsaw(
  data: unknown,
): Effect.Effect<FGChainsaw, ParseError> {
  assertVendorFGChainsaw(data);

  return pipe(
    Effect.all([
      parseAbstractEquipment(data),
      pipe(
        Effect.all({
          energyConsumption: parseVendorFloat(data.mEnergyConsumption),
          sawDownTreeTime: parseVendorFloat(data.mSawDownTreeTime),
          collateralPickupRadius: parseVendorFloat(
            data.mCollateralPickupRadius,
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

export type FGChainsaw = AbstractEquipment & {
  energyConsumption: number;
  sawDownTreeTime: number;
  collateralPickupRadius: number;
};
