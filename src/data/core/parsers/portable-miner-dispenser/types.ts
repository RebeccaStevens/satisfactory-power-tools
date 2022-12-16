import type { ConsumableEquipment, ResourceForm } from "~/data/core/types";

export type Data = ConsumableEquipment & {
  mAllowedResourceForms: Set<ResourceForm>;
  mPlaceDistanceMax: number;
};
