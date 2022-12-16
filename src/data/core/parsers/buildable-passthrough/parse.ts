import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import {
  parseNumber,
  parseBoolean,
  parseRotation3D,
  parseTranslation3D,
} from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mSnappedBuildingThickness"));
  assert(Object.hasOwn(data, "mMidMeshLength"));
  assert(Object.hasOwn(data, "mGenerateTunnelCollision"));
  assert(Object.hasOwn(data, "mEndCapRotation"));
  assert(Object.hasOwn(data, "mMidMeshRotation"));
  assert(Object.hasOwn(data, "mEndCapTranslation"));
  assert(Object.hasOwn(data, "mClearanceHeightMin"));
  assert(Object.hasOwn(data, "mClearanceThickness"));
  assert(Object.hasOwn(data, "mUseSoftClearance"));

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
