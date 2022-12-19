import assert from "node:assert/strict";

import { parseBuildable } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseRawCollection } from "~/scripts/parse-raw-game-data/docs/raw-collection-parser";
import {
  parseSpline,
  parseString,
  parseNumber,
  parseBoolean,
  parsePipeConnections,
} from "~/scripts/parse-raw-game-data/utils";
import { isNotNull } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const buildable = parseBuildable(data);

  assert(Object.hasOwn(data, "mRadius"));
  assert(Object.hasOwn(data, "mFlowLimit"));
  assert(Object.hasOwn(data, "mFlowIndicatorMinimumPipeLength"));
  assert(Object.hasOwn(data, "mPipeConnections"));
  assert(Object.hasOwn(data, "mMaxIndicatorTurnAngle"));
  assert(Object.hasOwn(data, "mFluidNames"));
  assert(Object.hasOwn(data, "mCurrentFluid"));
  assert(Object.hasOwn(data, "mLastContentForSound"));
  assert(Object.hasOwn(data, "mLastFlowForSound"));
  assert(Object.hasOwn(data, "mRattleLimit"));
  assert(Object.hasOwn(data, "mIsRattling"));
  assert(Object.hasOwn(data, "mMeshLength"));
  assert(Object.hasOwn(data, "mSplineData"));

  return {
    ...buildable,
    mRadius: parseNumber(data.mRadius),
    mFlowLimit: parseNumber(data.mFlowLimit),
    mFlowIndicatorMinimumPipeLength: parseNumber(
      data.mFlowIndicatorMinimumPipeLength,
    ),
    mPipeConnections: parsePipeConnections(data.mPipeConnections),
    mMaxIndicatorTurnAngle: parseNumber(data.mMaxIndicatorTurnAngle),
    mFluidNames: parseFluidNames(data.mFluidNames),
    mCurrentFluid: parseString(data.mCurrentFluid),
    mLastContentForSound: parseNumber(data.mLastContentForSound),
    mLastFlowForSound: parseNumber(data.mLastFlowForSound),
    mRattleLimit: parseNumber(data.mRattleLimit),
    mIsRattling: parseBoolean(data.mIsRattling),
    mMeshLength: parseNumber(data.mMeshLength),
    mSplineData: parseSpline(data.mSplineData),
  };
}

function parseFluidNames(
  value: unknown,
): Array<{ WwiseSafeName: string; ActualName: string }> {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return [];
  }

  const list = parseRawCollection(value);
  assert(list.type === "list");

  return list.data
    .map((raw) => {
      const mapEnts = parseRawCollection(raw);
      assert(mapEnts.type === "map");
      const map = Object.fromEntries(mapEnts.data);

      const WwiseSafeName = parseString(map.WwiseSafeName);
      if (WwiseSafeName === "No_Fluid") {
        return null;
      }

      const ActualName = parseString(map.ActualName);

      return {
        WwiseSafeName,
        ActualName,
      };
    })
    .filter(isNotNull);
}
