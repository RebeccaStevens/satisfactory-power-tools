import type { Item } from "~/data/types";
import { asMegaJoules, asItemTransporter, asColorString } from "~/data/types";

import type RawGameData from "./game-data.json";

export function getItems(rawItems: Readonly<typeof RawGameData["items"]>) {
  return new Map(
    Object.entries(rawItems).map(([id, data]): [string, Item] => {
      const energy = asMegaJoules(data.energy);
      const { points, icon } = data;
      const transporter = asItemTransporter(data.transporter);
      const color = asColorString(data.color);
      const typeId = data.type;
      const tier = data.tier < 0 ? null : data.tier;

      return [
        id,
        {
          id,
          energy,
          points,
          transporter,
          color,
          icon,
          tier,
          typeId,
        },
      ];
    }),
  );
}
