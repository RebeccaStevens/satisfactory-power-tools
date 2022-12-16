import assert from "node:assert/strict";

import { parseRawCollection } from "~/data/core/raw-collection-parser";
import {
  ItemTransferringStage,
  ScannableType,
  SchematicType,
  StackSize,
  CustomScaleType,
  OcclusionShape,
  AttachmentSocket,
  EquipmentSlot,
  GamePhase,
  WallType,
  GameEvent,
  ResourceForm,
  ExtractorType,
  PowerPoleType,
  WeaponState,
  ResearchState,
  BatteryStatus,
  RailroadAspect,
  RailroadBlockValidation,
  FreightCargoType,
  PlatformDockingStatus,
  HoverMode,
  StairDirection,
} from "~/data/core/types";
import type {
  AttachmentPoint,
  Color,
  Material,
  OcclusionBoxInfo,
  Point2D,
  Point3D,
  SubCategory,
  Vector2D,
  Vector3D,
  Rotation3D,
  PipeConnection,
  Spline,
  WireConnection,
  PowerConnection,
  Transform3D,
  MinMax,
  BeltConnection,
  Scale3D,
  RailroadConnection,
  LightControlData,
  Translation3D,
} from "~/data/core/types";

export function parseAmounts(value: unknown): Map<string, number> {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return new Map();
  }

  const collection = parseRawCollection(value);
  assert(collection instanceof Set);

  return new Map(
    collection.values().flatMap((rawItemAmount) => {
      const itemAmount = parseRawCollection(rawItemAmount);
      assert(itemAmount instanceof Map);
      const amount = itemAmount.get("Amount");
      return [
        [
          parseString(itemAmount.get("ItemClass")),
          amount === undefined ? 1 : parseNumber(amount),
        ] as const,
      ].values();
    }),
  );
}

export function parseAttachmentPoints(value: unknown): Set<AttachmentPoint> {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return new Set();
  }

  const collection = parseRawCollection(value);
  assert(collection instanceof Set);

  // TODO: implement.
  return new Set();
}

export function parseAttachmentSocket(value: unknown): AttachmentSocket | null {
  if (value === "None") {
    return null;
  }
  return parseEnum(AttachmentSocket, value);
}

export function parseBatteryStatus(value: unknown): BatteryStatus {
  return parseEnum(BatteryStatus, value);
}

export function parseBeltConnections(value: unknown): Set<BeltConnection> {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return new Set();
  }

  const collection = parseRawCollection(value);
  assert(collection instanceof Set);

  // TODO: implement.
  return new Set();
}

export function parseBoolean(value: unknown): boolean {
  assert(
    value === "False" || value === "True" || value === "0" || value === "1",
  );
  return value === "True" || value === "1";
}

export function parseClasses(value: unknown): Set<string> {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return new Set();
  }

  const collection = parseRawCollection(value);
  assert(collection instanceof Set);
  return collection;
}

export function parseColor(value: unknown): Color {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  const collection = parseRawCollection(value);
  assert(collection instanceof Map);

  const red = parseNumber(collection.get("R"));
  const green = parseNumber(collection.get("G"));
  const blue = parseNumber(collection.get("B"));
  const alpha = parseNumber(collection.get("A"));

  return { red, green, blue, alpha };
}

export function parseCustomScaleType(value: unknown): CustomScaleType {
  return parseEnum(CustomScaleType, value);
}

export function parseDirectionBooleanMap(
  value: unknown,
): Record<"Front" | "Bottom" | "Back" | "Top" | "Left" | "Right", boolean> {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  const collection =
    value === "" || value === "()" ? new Map() : parseRawCollection(value);
  assert(collection instanceof Map);

  return Object.fromEntries(
    ["Front", "Bottom", "Back", "Top", "Left", "Right"].map((dir) => {
      const v = collection.get(dir);
      return [dir, v === undefined ? false : parseBoolean(v)];
    }),
  );
}

export function parseEquipmentSlot(value: unknown): EquipmentSlot {
  return parseEnum(EquipmentSlot, value);
}

export function parseExtractorType(value: unknown): ExtractorType | null {
  if (value === "None") {
    return null;
  }
  return parseEnum(ExtractorType, value);
}

export function parseFalsableNumber(value: unknown): number | false {
  const number = parseNumber(value);
  return number < 0 ? false : number;
}

export function parseFreightCargoType(value: unknown): FreightCargoType {
  return parseEnum(FreightCargoType, value);
}

export function parseGameEvent(value: unknown): GameEvent {
  return parseEnum(GameEvent, value);
}

export function parseGameEvents(value: unknown): Set<GameEvent> {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return new Set();
  }

  const collection = parseRawCollection(value);
  assert(collection instanceof Set);

  return new Set(collection.values().map((raw) => parseGameEvent(raw)));
}

export function parseGamePhase(value: unknown): GamePhase {
  return parseEnum(GamePhase, value);
}

export function parseHoverMode(value: unknown): HoverMode {
  return parseEnum(HoverMode, value);
}

export function parseItemTransferringStage(
  value: unknown,
): ItemTransferringStage {
  return parseEnum(ItemTransferringStage, value);
}

export function parseLightControlData(value: unknown): LightControlData {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  const map = parseRawCollection(value);
  assert(map instanceof Map);

  return {
    Intensity: parseNumber(map.get("Intensity")),
  };
}

export function parseMaterials(value: unknown): Set<Material> {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return new Set();
  }

  const collection = parseRawCollection(value);
  assert(collection instanceof Set);

  // TODO: implement.
  return new Set();
}

export function parseMinMaxNumber(value: unknown): MinMax<number> {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  const collection = parseRawCollection(value);
  assert(collection instanceof Map);

  const min = parseNumber(collection.get("Min"));
  const max = parseNumber(collection.get("Max"));

  return {
    min,
    max,
  };
}

export function parseNullableNumber(value: unknown): number | null {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );
  if (value === "") {
    return null;
  }

  return parseNumber(value);
}

export function parseNullableString(value: unknown): string | null {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );
  if (value === "" || value === "None" || value === "(None)") {
    return null;
  }
  return value;
}

export function parseNumber(value: unknown): number {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );
  assert(/^-?\d+\.?\d*$/u.test(value));
  return Number.parseFloat(value);
}

export function parseOcclusionBoxInfo(value: unknown): Set<OcclusionBoxInfo> {
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
    set.values().map((info) => {
      const map = parseRawCollection(info);
      assert(map instanceof Map);

      const min = parsePoint3D(map.get("Min"));
      const max = parsePoint3D(map.get("Max"));
      const isValid = parseBoolean(map.get("IsValid"));
      return {
        min,
        max,
        isValid,
      };
    }),
  );
}

export function parseOcclusionShape(value: unknown): OcclusionShape {
  return parseEnum(OcclusionShape, value);
}

export function parsePipeConnections(value: unknown): Set<PipeConnection> {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return new Set();
  }

  const collection = parseRawCollection(value);
  assert(collection instanceof Set);

  // TODO: implement.
  return new Set();
}

export function parsePlatformDockingStatus(
  value: unknown,
): PlatformDockingStatus {
  return parseEnum(PlatformDockingStatus, value);
}

export function parsePoint2D(value: unknown): Point2D {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  const collection = parseRawCollection(value);
  assert(collection instanceof Map);

  const x = parseNumber(collection.get("X"));
  const y = parseNumber(collection.get("Y"));

  return { x, y };
}

export function parsePoint3D(value: unknown): Point3D {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  const collection = parseRawCollection(value);
  assert(collection instanceof Map);

  const x = parseNumber(collection.get("X"));
  const y = parseNumber(collection.get("Y"));
  const z = parseNumber(collection.get("Z"));

  return { x, y, z };
}

export function parsePowerConnections(value: unknown): Set<PowerConnection> {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return new Set();
  }

  const collection = parseRawCollection(value);
  assert(collection instanceof Set);

  // TODO: implement.
  return new Set();
}

export function parsePowerPoleType(value: unknown): PowerPoleType {
  return parseEnum(PowerPoleType, value);
}

export function parseRailroadAspect(value: unknown): RailroadAspect {
  return parseEnum(RailroadAspect, value);
}

export function parseRailroadBlockValidation(
  value: unknown,
): RailroadBlockValidation {
  return parseEnum(RailroadBlockValidation, value);
}

export function parseRailroadConnections(
  value: unknown,
): Set<RailroadConnection> {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return new Set();
  }

  const collection = parseRawCollection(value);
  assert(collection instanceof Set);

  // TODO: implement.
  return new Set();
}

export function parseResearchState(value: unknown): ResearchState {
  return parseEnum(ResearchState, value);
}

export function parseResourceForm(value: unknown): ResourceForm {
  return parseEnum(ResourceForm, value);
}

export function parseResourceForms(value: unknown): Set<ResourceForm> {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return new Set();
  }

  const collection = parseRawCollection(value);
  assert(collection instanceof Set);

  return new Set(collection.values().map((raw) => parseResourceForm(raw)));
}

export function parseRotation3D(value: unknown): Rotation3D {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  const collection = parseRawCollection(value);
  assert(collection instanceof Map);

  const pitch = parseNumber(collection.get("Pitch"));
  const yaw = parseNumber(collection.get("Yaw"));
  const roll = parseNumber(collection.get("Roll"));

  return { pitch, yaw, roll };
}

export function parseRotation3Dxyz(value: unknown): Rotation3D {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  const collection = parseRawCollection(value);
  assert(collection instanceof Map);

  const roll = parseNumber(collection.get("X"));
  const pitch = parseNumber(collection.get("Y"));
  const yaw = parseNumber(collection.get("Z"));

  return { pitch, yaw, roll };
}

export function parseScale3D(value: unknown): Scale3D {
  return parsePoint3D(value);
}

export function parseScannableType(value: unknown): ScannableType {
  return parseEnum(ScannableType, value);
}

export function parseSchematicType(value: unknown): SchematicType {
  return parseEnum(SchematicType, value);
}

export function parseSpline(value: unknown): Spline {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  // TODO: implement.
  return {};
}

export function parseStackSize(value: unknown): StackSize {
  return parseEnum(StackSize, value);
}

export function parseStairDirection(value: unknown): StairDirection {
  return parseEnum(StairDirection, value);
}

export function parseString(value: unknown): string {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );
  return value;
}

export function parseSubCategories(value: unknown): Set<SubCategory> {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return new Set();
  }

  const collection = parseRawCollection(value);
  assert(collection instanceof Set);

  // TODO: implement.
  return new Set();
}

export function parseTransform3D(value: unknown): Transform3D {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  const collection = parseRawCollection(value);
  assert(collection instanceof Map);

  const translation = parsePoint3D(collection.get("Translation"));
  const rotation = parseRotation3Dxyz(collection.get("Rotation"));
  const scale = parsePoint3D(collection.get("Scale3D"));

  return {
    translation,
    rotation,
    scale,
  };
}

export function parseTranslation3D(value: unknown): Translation3D {
  return parsePoint3D(value);
}

export function parseVector2D(value: unknown): Vector2D {
  return parsePoint2D(value);
}

export function parseVector3D(value: unknown): Vector3D {
  return parsePoint3D(value);
}

export function parseWallType(value: unknown): WallType {
  return parseEnum(WallType, value);
}

export function parseWeaponState(value: unknown): WeaponState {
  return parseEnum(WeaponState, value);
}

export function parseWireConnections(value: unknown): Set<WireConnection> {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()" || value === "None") {
    return new Set();
  }

  const collection = parseRawCollection(value);
  assert(collection instanceof Set);

  // TODO: implement.
  return new Set();
}

function parseEnum<T>(enumObject: StandardEnum<T>, value: unknown): T {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );
  assert(Object.values(enumObject).includes(value), `Invalid value: ${value}`);
  return Object.keys(enumObject)[
    Object.values(enumObject).indexOf(value)
  ] as unknown as T;
}

type StandardEnum<T> = {
  [id: string]: T | string;
  [nu: number]: string;
};
