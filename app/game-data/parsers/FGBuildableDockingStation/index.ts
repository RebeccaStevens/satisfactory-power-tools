import { Effect, pipe } from "effect";

import {
  type FGBuildableFactory,
  parseFGBuildableFactory,
} from "~/game-data/parsers/FGBuildableFactory";
import type { ParseError } from "~/game-data/parsers/errors";
import {
  parseVendorFloat,
  parseVendorInt,
} from "~/game-data/parsers/primitives";

import { assertVendorFGBuildableDockingStation } from "./assert";

export function parseFGBuildableDockingStation(
  data: unknown,
): Effect.Effect<FGBuildableDockingStation, ParseError> {
  assertVendorFGBuildableDockingStation(data);

  return pipe(
    Effect.all([
      parseFGBuildableFactory(data),
      pipe(
        Effect.all({
          minimumDockingTime: parseVendorFloat(data.mMinimumDockingTime),
          storageSizeX: parseVendorInt(data.mStorageSizeX),
          storageSizeY: parseVendorInt(data.mStorageSizeY),
          fuelInventorySizeX: parseVendorInt(data.mFuelInventorySizeX),
          fuelInventorySizeY: parseVendorInt(data.mFuelInventorySizeY),
          transferSpeed: parseVendorFloat(data.mTransferSpeed),
          fuelTransferSpeed: parseVendorFloat(data.mFuelTransferSpeed),
          stackTransferSize: parseVendorFloat(data.mStackTransferSize),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildableDockingStation = FGBuildableFactory & {
  minimumDockingTime: number;
  storageSizeX: number;
  storageSizeY: number;
  fuelInventorySizeX: number;
  fuelInventorySizeY: number;
  transferSpeed: number;
  fuelTransferSpeed: number;
  stackTransferSize: number;
};
