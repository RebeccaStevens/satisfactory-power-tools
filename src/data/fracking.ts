import assert from "node:assert/strict";

import {
  type FrackingSatellite,
  type Item,
  type FrackingCore,
} from "~/data/types";
import {
  asLocation3D,
  asRotation3D,
  asScale3D,
  asResourcePurity,
} from "~/data/types";

import type RawGameData from "./game-data.json";

export function getWells(
  rawWellGroups: Readonly<(typeof RawGameData)["wells"]>,
  items: ReadonlyMap<string, Item>,
) {
  return new Map(
    Object.entries(rawWellGroups).map(
      ([resourceId, rawWells]): [Item, Set<FrackingCore>] => {
        const resource = items.get(resourceId);
        assert(resource !== undefined);

        return [resource, new Set(rawWells.map(createFrackingCore))];
      },
    ),
  );
}

function createFrackingCore(
  rawCore: Readonly<
    (typeof RawGameData)["wells"][keyof (typeof RawGameData)["wells"]][number]
  >,
): FrackingCore {
  const { id } = rawCore;
  const location = asLocation3D(rawCore.location);
  const rotation = asRotation3D(rawCore.rotation);
  const scale = asScale3D(rawCore.scale);
  const satellites = new Set(rawCore.satellites.map(createFrackingSatellite));

  return { id, location, rotation, scale, satellites };
}

function createFrackingSatellite(
  rawSatellite: Readonly<
    (typeof RawGameData)["wells"][keyof (typeof RawGameData)["wells"]][number]["satellites"][number]
  >,
): FrackingSatellite {
  const { id } = rawSatellite;
  const location = asLocation3D(rawSatellite.location);
  const rotation = asRotation3D(rawSatellite.rotation);
  const scale = asScale3D(rawSatellite.scale);
  const purity = asResourcePurity(rawSatellite.purity);

  return { id, location, rotation, scale, purity };
}
