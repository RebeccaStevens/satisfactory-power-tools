import type RawGameData from "~/data/game-data.json";
import { type Building } from "~/data/types";

export function getBuildings(
  rawBuildings: Readonly<(typeof RawGameData)["buildings"]>,
) {
  return new Map(
    Object.entries(rawBuildings).map(([id, data]): [string, Building] => {
      const { categories, icon, menuPriority } = data;

      return [
        id,
        {
          id,
          icon,
          categories,
          menuPriority,
        },
      ];
    }),
  );
}
