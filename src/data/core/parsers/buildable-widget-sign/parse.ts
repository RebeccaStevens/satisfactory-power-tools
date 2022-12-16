import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import {
  parseNumber,
  parseColor,
  parsePoint2D,
  parsePoint3D,
} from "~/data/core/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mGainSignificanceDistance"));
  assert(Object.hasOwn(data, "mForegroundColor"));
  assert(Object.hasOwn(data, "mBackgroundColor"));
  assert(Object.hasOwn(data, "mAuxilaryColor"));
  assert(Object.hasOwn(data, "mEmissive"));
  assert(Object.hasOwn(data, "mGlossiness"));
  assert(Object.hasOwn(data, "mDataVersion"));
  assert(Object.hasOwn(data, "mWorldDimensions"));
  assert(Object.hasOwn(data, "mPoleOffset"));
  assert(Object.hasOwn(data, "mPoleScale"));
  assert(Object.hasOwn(data, "mSignToSignOffset"));

  return {
    ...buildable,

    mGainSignificanceDistance: parseNumber(data.mGainSignificanceDistance),
    mForegroundColor: parseColor(data.mForegroundColor),
    mBackgroundColor: parseColor(data.mBackgroundColor),
    mAuxilaryColor: parseColor(data.mAuxilaryColor),
    mEmissive: parseNumber(data.mEmissive),
    mGlossiness: parseNumber(data.mGlossiness),
    mDataVersion: parseNumber(data.mDataVersion),
    mWorldDimensions: parsePoint2D(data.mWorldDimensions),
    mPoleOffset: parsePoint3D(data.mPoleOffset),
    mPoleScale: parsePoint2D(data.mPoleScale),
    mSignToSignOffset: parseNumber(data.mSignToSignOffset),
  };
}
