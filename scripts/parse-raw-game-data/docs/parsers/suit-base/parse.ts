import { assert } from "chai";

import { assertPropertyExists } from "~/scripts/parse-raw-game-data/docs/assert";
import { parseBaseGasMask } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  isPMap,
  parseRawCollection,
} from "~/scripts/parse-raw-game-data/docs/raw-collection-parser";
import {
  parseBoolean,
  parseNumber,
  parseString,
} from "~/scripts/parse-raw-game-data/utils";
import { isObject } from "~/utils";

import { type Data } from "./types";

export function parse(data: unknown): Data {
  assert(isObject(data));

  const base = parseBaseGasMask(data);

  assertPropertyExists(data, "mImmunity");
  assertPropertyExists(data, "mIsBurningFuel");
  assertPropertyExists(data, "mSuit1PMeshMaterials");

  return {
    ...base,
    mImmunity: parseNumber(data.mImmunity),
    mIsBurningFuel: parseBoolean(data.mIsBurningFuel),
    mSuit1PMeshMaterials: parseSuit1PMeshMaterials(data.mSuit1PMeshMaterials),
  };
}

function parseSuit1PMeshMaterials(value: unknown): Array<{
  SlotName: string;
  Material: string;
}> {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return [];
  }

  const list = parseRawCollection(value);
  assert(list.type === "list");

  return list.data.map((map) => {
    assert(isPMap(map));
    const data = Object.fromEntries(map.data);

    assert(typeof data.SlotName === "string");
    assert(typeof data.Material === "string");

    return {
      SlotName: parseString(data.SlotName),
      Material: parseString(data.Material),
    };
  });
}
