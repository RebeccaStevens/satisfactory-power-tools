import assert from "node:assert/strict";

import { parseBuildableGeneratorFuel } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseGeneratorNuclearWarning,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const generatorFuel = parseBuildableGeneratorFuel(data);

  assert("mWasteLeftFromCurrentFuel" in data);
  assert("mCurrentGeneratorNuclearWarning" in data);

  return {
    ...generatorFuel,
    mWasteLeftFromCurrentFuel: parseNumber(data.mWasteLeftFromCurrentFuel),
    mCurrentGeneratorNuclearWarning: parseGeneratorNuclearWarning(
      data.mCurrentGeneratorNuclearWarning,
    ),
  };
}
