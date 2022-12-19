import assert from "node:assert/strict";

import { parseBuildableGeneratorFuel } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  parseNumber,
  parseGeneratorNuclearWarning,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const generatorFuel = parseBuildableGeneratorFuel(data);

  assert(Object.hasOwn(data, "mWasteLeftFromCurrentFuel"));
  assert(Object.hasOwn(data, "mCurrentGeneratorNuclearWarning"));

  return {
    ...generatorFuel,
    mWasteLeftFromCurrentFuel: parseNumber(data.mWasteLeftFromCurrentFuel),
    mCurrentGeneratorNuclearWarning: parseGeneratorNuclearWarning(
      data.mCurrentGeneratorNuclearWarning,
    ),
  };
}
