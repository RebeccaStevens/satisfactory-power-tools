import assert from "node:assert/strict";

import { parseBaseGasMask } from "~/data/core/parsers";
import { parseRawCollection } from "~/data/core/raw-collection-parser";
import { parseBoolean, parseNumber, parseString } from "~/data/core/utils";

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

function parseSuit1PMeshMaterials(value: unknown): Set<{
  SlotName: string;
  Material: string;
}> {
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
    set.values().map((value) => {
      const map = parseRawCollection(value);
      assert(map instanceof Map);
      return {
        SlotName: parseString(map.get("SlotName")),
        Material: parseString(map.get("Material")),
      };
    }),
  );
}
