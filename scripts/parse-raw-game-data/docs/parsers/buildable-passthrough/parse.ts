import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseBoolean,
  parseRotation3D,
  parseTranslation3D,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mSnappedBuildingThickness");
  assertPropertyExists(data, "mMidMeshLength");
  assertPropertyExists(data, "mGenerateTunnelCollision");
  assertPropertyExists(data, "mEndCapRotation");
  assertPropertyExists(data, "mMidMeshRotation");
  assertPropertyExists(data, "mEndCapTranslation");
  assertPropertyExists(data, "mClearanceHeightMin");
  assertPropertyExists(data, "mClearanceThickness");
  assertPropertyExists(data, "mUseSoftClearance");

  return {
    ...buildable,
    mSnappedBuildingThickness: parseNumber(data.mSnappedBuildingThickness),
    mMidMeshLength: parseNumber(data.mMidMeshLength),
    mGenerateTunnelCollision: parseBoolean(data.mGenerateTunnelCollision),
    mEndCapRotation: parseRotation3D(data.mEndCapRotation),
    mMidMeshRotation: parseRotation3D(data.mMidMeshRotation),
    mEndCapTranslation: parseTranslation3D(data.mEndCapTranslation),
    mClearanceHeightMin: parseNumber(data.mClearanceHeightMin),
    mClearanceThickness: parseNumber(data.mClearanceThickness),
    mUseSoftClearance: parseBoolean(data.mUseSoftClearance),
  };
}
