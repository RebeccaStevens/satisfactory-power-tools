import assert from "node:assert/strict";

import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import {
  parseNumber,
  parseBeltConnections,
  parsePipeConnections,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildableBuilding = parseBuildableBuilding(data);

  assert(Object.hasOwn(data, "mManufacturingSpeed"));
  assert(Object.hasOwn(data, "mFactoryInputConnections"));
  assert(Object.hasOwn(data, "mPipeInputConnections"));
  assert(Object.hasOwn(data, "mFactoryOutputConnections"));
  assert(Object.hasOwn(data, "mPipeOutputConnections"));

  return {
    ...buildableBuilding,
    mManufacturingSpeed: parseNumber(data.mManufacturingSpeed),
    mFactoryInputConnections: parseBeltConnections(
      data.mFactoryInputConnections,
    ),
    mPipeInputConnections: parsePipeConnections(data.mPipeInputConnections),
    mFactoryOutputConnections: parseBeltConnections(
      data.mFactoryOutputConnections,
    ),
    mPipeOutputConnections: parsePipeConnections(data.mPipeOutputConnections),
  };
}
