import { mul } from "uom-ts";

import type RawGameData from "~/data/game-data.json";
import {
  type MegaJoules,
  type GeneralItem,
  asItemTransporter,
  asColorString,
  pipe,
} from "~/data/types";

export function getItems(
  rawItems: Readonly<(typeof RawGameData)["items"]>,
): Map<string, GeneralItem> {
  return new Map(
    Object.entries(rawItems).map(([id, data]): [string, GeneralItem] => {
      const transporter = asItemTransporter(data.transporter);
      const energy = mul(
        data.energy as MegaJoules,
        transporter === pipe ? 1000 : 1,
      );
      const { points, icon, sinkable, categories, menuPriority } = data;
      const color = asColorString(data.color);
      const typeId = data.type;
      const tier = data.tier < 0 ? null : data.tier;

      return [
        id,
        {
          id,
          energy,
          sinkable,
          points,
          transporter,
          color,
          icon,
          categories,
          menuPriority,
          tier,
          typeId,
        },
      ];
    }),
  );
}
