import type { ResourceItem } from "~/data/docs/items/types";
import type { Ided, Named } from "~/data/types";

export type Purities = Map<Purity["id"], Purity>;

export type Purity = {
  id: string;
  efficiencyMultiplier: number;
};
export type PurityCollection = Map<Purity, number>;

type ResourceExtractables = {
  resource: ResourceItem;
  amounts: PurityCollection;
};

export type ResourceNodes = ResourceExtractables;

export type ResourceWell = Ided &
  Named & {
    satellites: Set<ResourceWellSatellites>;
    wellSizeMultiplier: number;
  };

export type ResourceWellSatellites = ResourceExtractables;

export type Geysers = PurityCollection;

/**
 * The type of node extractor.
 */
export const enum ResourceNodeExtractorType {
  MINER = "miner",
  OIL = "oil",
  WATER = "water",
  FRACKING = "fracking",
}
