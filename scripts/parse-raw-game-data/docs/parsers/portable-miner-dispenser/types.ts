import type { ConsumableEquipment } from "~/scripts/parse-raw-game-data/docs/parsers";
import type { ResourceForm } from "~/scripts/parse-raw-game-data/types";

export type Data = ConsumableEquipment & {
  mAllowedResourceForms: ResourceForm[];
  mPlaceDistanceMax: number;
};
