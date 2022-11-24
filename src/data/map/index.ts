import assert from "node:assert/strict";

import { snakeCase } from "change-case";
import { pipeSync, reduce } from "iter-ops";

import {
  type Item,
  type ResourceItem,
  ItemType,
} from "~/data/docs/items/types";
import mapJsonData from "~/data/raw/map.json" assert { type: "json" };
import { isNotNull, isObject } from "~/utils";

import type {
  Geysers,
  Purities,
  Purity,
  ResourceNodes,
  ResourceWell,
  ResourceWellSatellites,
} from "./types";

/**
 * Load all the map data.
 */
export function loadMapData(itemsById: ReadonlyMap<Item["id"], Item>) {
  assert(isObject(mapJsonData));

  const purities = parsePurities();
  const resourceNodes = parseResourceNodes(itemsById, purities);
  const resourceWells = parseResourceWells(itemsById, purities);
  const geysers = parseGeysers(purities);

  return {
    purities,
    resourceNodes,
    resourceWells,
    geysers,
  };
}

/**
 * Get the possible purities.
 */
function parsePurities(): Purities {
  return new Map<Purity["id"], Purity>(
    Object.entries(mapJsonData.purities).map(([id, efficiencyMultiplier]) => [
      id,
      {
        id,
        efficiencyMultiplier,
      },
    ]),
  );
}

/**
 * Get all the resources node types and how many of each exist.
 */
function parseResourceNodes(
  itemsById: ReadonlyMap<string, Item>,
  purities: Readonly<Purities>,
): Map<ResourceItem, ResourceNodes> {
  return new Map(
    Object.entries(mapJsonData.resources.nodes)
      .map(([resourceId, rawNodes]): [ResourceItem, ResourceNodes] | null => {
        const resource = itemsById.get(`item_${resourceId}`);
        if (resource === undefined) {
          return null;
        }
        assert(resource.itemType === ItemType.RESOURCE);

        return [
          resource,
          {
            resource,
            amounts: getAmounts(rawNodes, purities),
          },
        ];
      })
      .filter(isNotNull),
  );
}

/**
 * Get all the resources well types and how many of each exist.
 */
function parseResourceWells(
  itemsById: ReadonlyMap<string, Item>,
  purities: Readonly<Purities>,
): Map<ResourceItem, Set<ResourceWell>> {
  return new Map(
    Object.entries(mapJsonData.resources.wells).map(
      ([resourceId, rawWells]): [ResourceItem, Set<ResourceWell>] => {
        const resource = itemsById.get(`item_${resourceId}`);
        assert(
          resource !== undefined && resource.itemType === ItemType.RESOURCE,
        );

        const wells = new Set(
          rawWells.map((satellitesAmounts, wellIndex) => {
            const id = `${resource.name} Well #${wellIndex + 1}`;
            const name = snakeCase(id);

            const satellites = new Set<ResourceWellSatellites>([
              {
                resource,
                amounts: getAmounts(satellitesAmounts, purities),
              },
            ]);

            const wellSizeMultiplier: number = pipeSync(
              satellites,
              reduce(
                (sizeSum, satellitesOfPurity) =>
                  sizeSum +
                  pipeSync(
                    satellitesOfPurity.amounts,
                    reduce(
                      (puritySum, [purity, amount]) =>
                        puritySum + amount * purity.efficiencyMultiplier,
                      0,
                    ),
                  ).first!,
                0,
              ),
            ).first!;

            return {
              id,
              name,
              satellites,
              wellSizeMultiplier,
            };
          }),
        );

        return [resource, wells];
      },
    ),
  );
}

/**
 * Get all the geysers types and how many of each exist.
 */
function parseGeysers(purities: Readonly<Purities>): Geysers {
  return getAmounts(mapJsonData.geysers, purities);
}

/**
 * Get the purity amounts.
 */
function getAmounts(
  rawPurities: Readonly<Record<string, number>>,
  purities: Readonly<Purities>,
) {
  return new Map(
    Object.entries(rawPurities).map(([purityId, amount]) => {
      const purity = purities.get(purityId);
      assert(purity !== undefined);
      return [purity, amount];
    }),
  );
}

export {
  type Purities,
  type Purity,
  type PurityCollection,
  type ResourceNodes,
  type ResourceWell,
  type ResourceWellSatellites,
  type Geysers,
  ResourceNodeExtractorType,
} from "./types";
