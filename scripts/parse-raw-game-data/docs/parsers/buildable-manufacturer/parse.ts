import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseBeltConnections,
  parsePipeConnections,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildableBuilding = parseBuildableBuilding(data);

  assertPropertyExists(data, "mManufacturingSpeed");
  assertPropertyExists(data, "mFactoryInputConnections");
  assertPropertyExists(data, "mPipeInputConnections");
  assertPropertyExists(data, "mFactoryOutputConnections");
  assertPropertyExists(data, "mPipeOutputConnections");

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
