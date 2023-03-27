import assert from "node:assert/strict";

import { ResourcePurity } from "~/scripts/parse-raw-game-data/types";
import {
  parseString,
  quaternionToAttitude,
} from "~/scripts/parse-raw-game-data/utils";
import { assertNever } from "~/utils";

import resourceJsonData from "../data/ResourceNodes.json" assert { type: "json" };

export function loadData() {
  return {
    nodes: parseNodeData(resourceJsonData.nodes),
    geysers: parseGeyserData(resourceJsonData.geysers),
    wells: parseWellData(
      resourceJsonData.frackingCores,
      resourceJsonData.frackingSatellites,
    ),
  };
}

function parseNodeData(nodes: Readonly<typeof resourceJsonData.nodes>) {
  const nodeEntries = nodes.map((node) => {
    const resource = parseString(node.item.class);
    const data = {
      ...parseCommon(node),
      purity: parsePurity(node),
    };

    return [resource, data] as [typeof resource, typeof data];
  });

  return nodeEntries.reduce<
    Record<string, Array<(typeof nodeEntries)[number][1]>>
  >((c, [resource, data]) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- see: https://github.com/typescript-eslint/typescript-eslint/issues/6635.
    c[resource] ??= [];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const node = c[resource]!;
    node.push(data);
    return c;
  }, {});
}

function parseGeyserData(geysers: Readonly<typeof resourceJsonData.geysers>) {
  return geysers.map((geyser) => ({
    ...parseCommon(geyser),
    purity: parsePurity(geyser),
  }));
}

function parseWellData(
  coreData: Readonly<typeof resourceJsonData.frackingCores>,
  satelliteData: Readonly<typeof resourceJsonData.frackingSatellites>,
) {
  const coreEntries = coreData.map((core) => {
    const resource = parseString(core.item.class);
    const longId = parseString(core.path);
    const data = parseCommon(core);
    return [resource, longId, data] as [
      typeof resource,
      typeof longId,
      typeof data,
    ];
  });

  const satelliteEntries = satelliteData.map((satellite) => {
    const coreId = parseString(satellite.frackingCore);
    const data = {
      ...parseCommon(satellite),
      purity: parsePurity(satellite),
    };
    return [coreId, data] as [typeof coreId, typeof data];
  });

  const satellitesByCore = satelliteEntries.reduce<
    Map<string, Array<(typeof satelliteEntries)[number][1]>>
  >((c, [coreId, data]) => {
    let m_satellite = c.get(coreId);
    if (m_satellite === undefined) {
      m_satellite = [];
      c.set(coreId, m_satellite);
    }
    m_satellite.push(data);
    return c;
  }, new Map());

  return coreEntries.reduce<
    Record<
      string,
      Array<
        (typeof coreEntries)[number][2] & {
          satellites: Array<(typeof satelliteEntries)[number][1]>;
        }
      >
    >
  >((c, [resource, coreId, data]) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- see: https://github.com/typescript-eslint/typescript-eslint/issues/6635.
    c[resource] ??= [];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const core = c[resource]!;
    const satellites = satellitesByCore.get(coreId);
    assert(satellites !== undefined);
    core.push({ ...data, satellites });
    return c;
  }, {});
}

function parseCommon(
  node: Readonly<
    | (typeof resourceJsonData.nodes)[number]
    | (typeof resourceJsonData.geysers)[number]
    | (typeof resourceJsonData.frackingCores)[number]
  >,
) {
  return {
    id: parseString(node.name),
    location: node.location,
    rotation: quaternionToAttitude(node.quat),
    scale: node.scale,
  };
}

function parsePurity(
  thing: Readonly<
    | (typeof resourceJsonData.nodes)[number]
    | (typeof resourceJsonData.geysers)[number]
    | (typeof resourceJsonData.frackingSatellites)[number]
  >,
) {
  return thing.purity === ResourcePurity.Pure
    ? "pure"
    : thing.purity === ResourcePurity.Normal
    ? "normal"
    : thing.purity === ResourcePurity.Impure
    ? "impure"
    : assertNever(`unknown ResourcePurity: ${thing.purity}`);
}
