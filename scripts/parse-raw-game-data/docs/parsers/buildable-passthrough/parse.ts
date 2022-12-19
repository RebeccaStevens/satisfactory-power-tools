import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseBoolean,
  parseRotation3D,
  parseTranslation3D,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assert("mSnappedBuildingThickness" in data);
  assert("mMidMeshLength" in data);
  assert("mGenerateTunnelCollision" in data);
  assert("mEndCapRotation" in data);
  assert("mMidMeshRotation" in data);
  assert("mEndCapTranslation" in data);
  assert("mClearanceHeightMin" in data);
  assert("mClearanceThickness" in data);
  assert("mUseSoftClearance" in data);

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
