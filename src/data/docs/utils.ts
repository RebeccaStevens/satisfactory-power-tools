import { snakeCase } from "change-case";

import { ResourceNodeExtractorType } from "~/data/map/types";
import type { Ided, Named } from "~/data/types";

import type { ResourceItem } from "./items/types";
import type { RawBase } from "./raw-types";

/**
 * Get the basics out off the given raw data element.
 */
export function parseBase(
  rawData: Readonly<RawBase>,
  type: string,
): Ided & Named {
  const id = snakeCase(`${type} ${rawData.mDisplayName}`);
  const name = rawData.mDisplayName;

  return { id, name };
}

/**
 * Strip away the full-name parts of a class name and return the simple part.
 */
export function getSimpleInternalClassName(internalClassName: string) {
  if (
    internalClassName.startsWith("Class'\"") &&
    internalClassName.endsWith("\"'")
  ) {
    return internalClassName.slice(
      Math.max(
        internalClassName.lastIndexOf("/"),
        internalClassName.lastIndexOf("."),
        7,
      ) + 1,
      -2,
    );
  }

  if (
    internalClassName.startsWith("BlueprintGeneratedClass'\"") &&
    internalClassName.endsWith("\"'")
  ) {
    return internalClassName.slice(
      Math.max(
        internalClassName.lastIndexOf("/"),
        internalClassName.lastIndexOf("."),
        25,
      ) + 1,
      -2,
    );
  }

  return internalClassName.slice(
    Math.max(
      internalClassName.lastIndexOf("/"),
      internalClassName.lastIndexOf("."),
    ) + 1,
  );
}

/**
 * Get the node extractor type needed for the given resource.
 */
export function getResourceNodeExtractorType(
  resource: Readonly<ResourceItem> | null,
): ResourceNodeExtractorType | null {
  return resource === null
    ? null
    : resource.id === "item_water"
    ? ResourceNodeExtractorType.WATER
    : resource.id === "item_crude_oil"
    ? ResourceNodeExtractorType.OIL
    : ResourceNodeExtractorType.MINER;
}
