import type {
  ConsumableEquipment,
  ResourceForm,
} from "~/scripts/parse-raw-game-data/types";

export type Data = ConsumableEquipment & {
  mAllowedResourceForms: ResourceForm[];
  mPlaceDistanceMax: number;
};
