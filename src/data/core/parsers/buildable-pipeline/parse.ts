import assert from "node:assert/strict";

import { parseBuildable } from "~/data/core/parsers";
import { parseRawCollection } from "~/data/core/raw-collection-parser";
import {
  parseSpline,
  parseString,
  parseNumber,
  parseBoolean,
  parsePipeConnections,
} from "~/data/core/utils";
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
): Set<{ WwiseSafeName: string; ActualName: string }> {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return new Set();
  }

  const set = parseRawCollection(value);
  assert(set instanceof Set);

  return new Set(
    set
      .values()
      .map((raw) => {
        const map = parseRawCollection(raw);
        assert(map instanceof Map);

        const WwiseSafeName = parseString(map.get("WwiseSafeName"));
        if (WwiseSafeName === "No_Fluid") {
          return null;
        }

        const ActualName = parseString(map.get("ActualName"));

        return {
          WwiseSafeName,
          ActualName,
        };
      })
      .filter(isNotNull),
  );
}
