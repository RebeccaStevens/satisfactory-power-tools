import assert from "node:assert/strict";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseColor,
  parsePoint2D,
  parsePoint3D,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mGainSignificanceDistance");
  assertPropertyExists(data, "mForegroundColor");
  assertPropertyExists(data, "mBackgroundColor");
  assertPropertyExists(data, "mAuxilaryColor");
  assertPropertyExists(data, "mEmissive");
  assertPropertyExists(data, "mGlossiness");
  assertPropertyExists(data, "mDataVersion");
  assertPropertyExists(data, "mWorldDimensions");
  assertPropertyExists(data, "mPoleOffset");
  assertPropertyExists(data, "mPoleScale");
  assertPropertyExists(data, "mSignToSignOffset");

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
