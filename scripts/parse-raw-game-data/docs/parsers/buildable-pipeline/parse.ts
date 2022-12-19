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
import { isNotNull, isObject } from "~/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assert("mRadius" in data);
  assert("mFlowLimit" in data);
  assert("mFlowIndicatorMinimumPipeLength" in data);
  assert("mPipeConnections" in data);
  assert("mMaxIndicatorTurnAngle" in data);
  assert("mFluidNames" in data);
  assert("mCurrentFluid" in data);
  assert("mLastContentForSound" in data);
  assert("mLastFlowForSound" in data);
  assert("mRattleLimit" in data);
  assert("mIsRattling" in data);
  assert("mMeshLength" in data);
  assert("mSplineData" in data);

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
