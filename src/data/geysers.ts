import type RawGameData from "~/data/game-data.json";
import { type Geyser } from "~/data/types";
import {
  asLocation3D,
  asRotation3D,
  asScale3D,
  asResourcePurity,
} from "~/data/types";

export function getGeysers(
  rawGeysers: Readonly<(typeof RawGameData)["geysers"]>,
) {
  return new Set(
    rawGeysers.map((data): Geyser => {
      const { id } = data;
      const location = asLocation3D(data.location);
      const rotation = asRotation3D(data.rotation);
      const scale = asScale3D(data.scale);
      const purity = asResourcePurity(data.purity);

      return { id, location, rotation, scale, purity };
    }),
  );
}
