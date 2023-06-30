import { assert } from "chai";

import type RawGameData from "~/data/game-data.json";
import { type GeneralItem, type Node } from "~/data/types";
import {
  asLocation3D,
  asRotation3D,
  asScale3D,
  asResourcePurity,
} from "~/data/types";

export function getNodes(
  rawNodeGroups: Readonly<(typeof RawGameData)["nodes"]>,
  items: ReadonlyMap<string, GeneralItem>,
) {
  return new Map(
    Object.entries(rawNodeGroups).map(
      ([resourceId, rawNodes]): [GeneralItem, Set<Node>] => {
        const resource = items.get(resourceId);
        assert(resource !== undefined);

        return [
          resource,
          new Set(
            rawNodes.map((data): Node => {
              const { id } = data;
              const location = asLocation3D(data.location);
              const rotation = asRotation3D(data.rotation);
              const scale = asScale3D(data.scale);
              const purity = asResourcePurity(data.purity);

              return { id, location, rotation, scale, purity };
            }),
          ),
        ];
      },
    ),
  );
}
