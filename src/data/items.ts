import type { Id, Item } from "~/data/types";
import {
  asId,
  asName,
  asMegaJoules,
  asPoints,
  asItemTransporter,
  asColorString,
} from "~/data/types";

import type RawGameData from "./game-data.json";

export function getItems(rawItems: Readonly<typeof RawGameData["items"]>) {
  return new Map(
    Object.entries(rawItems).map(([rawId, data]): [Id, Item] => {
      const id = asId(rawId);
      const name = asName(data.name);
      const energy = asMegaJoules(data.energy);
      const points = asPoints(data.points);
      const transporter = asItemTransporter(data.transporter);
      const color = asColorString(data.color);
      const { icon } = data;
      return [
        id,
        {
          id,
          name,
          energy,
          points,
          transporter,
          color,
          icon,
        },
      ];
    }),
  );
}
