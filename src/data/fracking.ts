import assert from "node:assert/strict";

import type { Id, Item, FrackingCore } from "~/data/types";
import {
  asId,
  asLocation3D,
  asRotation3D,
  asScale3D,
  asResourcePurity,
} from "~/data/types";

import type RawGameData from "./game-data.json";

export function getWells(
  rawWellGroups: Readonly<typeof RawGameData["wells"]>,
  items: ReadonlyMap<Id, Item>,
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
              const id = asId(data.id);
              const location = asLocation3D(data.location);
              const rotation = asRotation3D(data.rotation);
              const scale = asScale3D(data.scale);
              const satellites = new Set(
                data.satellites.map((satellite) => {
                  const id = asId(satellite.id);
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
