import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
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

  assertPropertyExists(data, "mWasteLeftFromCurrentFuel");
  assertPropertyExists(data, "mCurrentGeneratorNuclearWarning");

  return {
    ...generatorFuel,
    mWasteLeftFromCurrentFuel: parseNumber(data.mWasteLeftFromCurrentFuel),
    mCurrentGeneratorNuclearWarning: parseGeneratorNuclearWarning(
      data.mCurrentGeneratorNuclearWarning,
    ),
  };
}
