import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseColor,
  parsePoint2D,
  parsePoint3D,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assert("mGainSignificanceDistance" in data);
  assert("mForegroundColor" in data);
  assert("mBackgroundColor" in data);
  assert("mAuxilaryColor" in data);
  assert("mEmissive" in data);
  assert("mGlossiness" in data);
  assert("mDataVersion" in data);
  assert("mWorldDimensions" in data);
  assert("mPoleOffset" in data);
  assert("mPoleScale" in data);
  assert("mSignToSignOffset" in data);

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
