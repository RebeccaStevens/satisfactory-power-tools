import assert from "node:assert/strict";

import { parseBaseGasMask } from "~/scripts/parse-raw-game-data/docs/parsers";
import { parseRawCollection } from "~/scripts/parse-raw-game-data/docs/raw-collection-parser";
import {
  parseBoolean,
  parseNumber,
  parseString,
} from "~/scripts/parse-raw-game-data/utils";

import type { Data } from "./types";

export function parse(data: unknown): Data {
  const base = parseBaseGasMask(data);

  assert(Object.hasOwn(data, "mImmunity"));
  assert(Object.hasOwn(data, "mIsBurningFuel"));
  assert(Object.hasOwn(data, "mSuit1PMeshMaterials"));

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

  return list.data.map((v) => {
    const mapEnts = parseRawCollection(v);
    assert(mapEnts.type === "map");
    const map = Object.fromEntries(mapEnts.data);

    return {
      SlotName: parseString(map.SlotName),
      Material: parseString(map.Material),
    };
  });
}
