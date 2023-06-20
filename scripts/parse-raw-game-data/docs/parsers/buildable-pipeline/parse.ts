import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
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

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const buildable = parseBuildable(data);

  assertPropertyExists(data, "mRadius");
  assertPropertyExists(data, "mFlowLimit");
  assertPropertyExists(data, "mFlowIndicatorMinimumPipeLength");
  assertPropertyExists(data, "mPipeConnections");
  assertPropertyExists(data, "mMaxIndicatorTurnAngle");
  assertPropertyExists(data, "mFluidNames");
  assertPropertyExists(data, "mCurrentFluid");
  assertPropertyExists(data, "mLastContentForSound");
  assertPropertyExists(data, "mLastFlowForSound");
  assertPropertyExists(data, "mRattleLimit");
  assertPropertyExists(data, "mIsRattling");
  assertPropertyExists(data, "mMeshLength");
  assertPropertyExists(data, "mSplineData");

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
    .map((map) => {
      assert(typeof map === "object");
      assert(map.type === "map");
      const data = Object.fromEntries(map.data);

      assert(typeof data.WwiseSafeName === "string");
      const WwiseSafeName = parseString(data.WwiseSafeName);
      if (WwiseSafeName === "No_Fluid") {
        return null;
      }

      assert(typeof data.ActualName === "string");
      const ActualName = parseString(data.ActualName);

      return {
        WwiseSafeName,
        ActualName,
      };
    })
    .filter(isNotNull);
}
