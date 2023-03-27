import assert from "node:assert/strict";

import type { Item, FrackingCore } from "~/data/types";
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

        return [
          resource,
          new Set(
            rawWells.map((data): FrackingCore => {
              const { id } = data;
              const location = asLocation3D(data.location);
              const rotation = asRotation3D(data.rotation);
              const scale = asScale3D(data.scale);
              const satellites = new Set(
                data.satellites.map((satellite) => {
                  const { id } = satellite;
                  const location = asLocation3D(satellite.location);
                  const rotation = asRotation3D(satellite.rotation);
                  const scale = asScale3D(satellite.scale);
                  const purity = asResourcePurity(satellite.purity);

                  return { id, location, rotation, scale, purity };
                }),
              );

              return { id, location, rotation, scale, satellites };
            }),
          ),
        ];
      },
    ),
  );
}
