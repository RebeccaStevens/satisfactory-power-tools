import assert from "node:assert/strict";

import { parseRawCollection } from "~/scripts/parse-raw-game-data/raw-collection-parser";
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
} from "~/scripts/parse-raw-game-data/types";
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
} from "~/scripts/parse-raw-game-data/types";

export function parseAmounts(value: unknown): Record<string, number> {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return {};
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");

  return Object.fromEntries(
    collection.data.flatMap((rawItemAmount) => {
      const itemAmountEnts = parseRawCollection(rawItemAmount);
      assert(itemAmountEnts.type === "map");
      const itemAmount = Object.fromEntries(itemAmountEnts.data);
      const amount = itemAmount.Amount;
      return [
        [
          parseString(itemAmount.ItemClass),
          amount === undefined ? 1 : parseNumber(amount),
        ] as const,
      ];
    }),
  );
}

export function parseAttachmentPoints(value: unknown): AttachmentPoint[] {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return [];
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");

  // TODO: implement.
  return [];
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

export function parseBeltConnections(value: unknown): BeltConnection[] {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return [];
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");

  // TODO: implement.
  return [];
}

export function parseBoolean(value: unknown): boolean {
  assert(
    value === "False" || value === "True" || value === "0" || value === "1",
  );
  return value === "True" || value === "1";
}

export function parseClasses(value: unknown): string[] {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return [];
  }

  const list = parseRawCollection(value);
  assert(list.type === "list");
  return list.data;
}

export function parseColor(value: unknown): Color {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  const mapEnts = parseRawCollection(value);
  assert(mapEnts.type === "map");
  const map = Object.fromEntries(mapEnts.data);

  const red = parseNumber(map.R);
  const green = parseNumber(map.G);
  const blue = parseNumber(map.B);
  const alpha = parseNumber(map.A);

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

  const mapEnts =
    value === "" || value === "()" ? undefined : parseRawCollection(value);
  const map = Object.fromEntries(
    mapEnts === undefined
      ? []
      : (void assert(mapEnts.type === "map"),
        mapEnts.data as Array<[string, string]>),
  );

  return Object.fromEntries(
    ["Front", "Bottom", "Back", "Top", "Left", "Right"].map((dir) => {
      const v = map[dir];
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

export function parseGameEvents(value: unknown): GameEvent[] {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return [];
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");

  return collection.data.map((raw) => parseGameEvent(raw));
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

  const mapEnts = parseRawCollection(value);
  assert(mapEnts.type === "map");
  const map = Object.fromEntries(mapEnts.data);

  return {
    Intensity: parseNumber(map.Intensity),
  };
}

export function parseMaterials(value: unknown): Material[] {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return [];
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");

  // TODO: implement.
  return [];
}

export function parseMinMaxNumber(value: unknown): MinMax<number> {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  const mapEnts = parseRawCollection(value);
  assert(mapEnts.type === "map");
  const map = Object.fromEntries(mapEnts.data);

  const min = parseNumber(map.Min);
  const max = parseNumber(map.Max);

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

export function parseOcclusionBoxInfo(value: unknown): OcclusionBoxInfo[] {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return [];
  }

  const list = parseRawCollection(value);
  assert(list.type === "list");

  return list.data.map((info) => {
    const mapEnts = parseRawCollection(info);
    assert(mapEnts.type === "map");
    const map = Object.fromEntries(mapEnts.data);

    const min = parsePoint3D(map.Min);
    const max = parsePoint3D(map.Max);
    const isValid = parseBoolean(map.IsValid);
    return {
      min,
      max,
      isValid,
    };
  });
}

export function parseOcclusionShape(value: unknown): OcclusionShape {
  return parseEnum(OcclusionShape, value);
}

export function parsePipeConnections(value: unknown): PipeConnection[] {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return [];
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");

  // TODO: implement.
  return [];
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

  const mapEnts = parseRawCollection(value);
  assert(mapEnts.type === "map");
  const map = Object.fromEntries(mapEnts.data);

  const x = parseNumber(map.X);
  const y = parseNumber(map.Y);

  return { x, y };
}

export function parsePoint3D(value: unknown): Point3D {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  const mapEnts = parseRawCollection(value);
  assert(mapEnts.type === "map");
  const map = Object.fromEntries(mapEnts.data);

  const x = parseNumber(map.X);
  const y = parseNumber(map.Y);
  const z = parseNumber(map.Z);

  return { x, y, z };
}

export function parsePowerConnections(value: unknown): PowerConnection[] {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return [];
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");

  // TODO: implement.
  return [];
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

export function parseRailroadConnections(value: unknown): RailroadConnection[] {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return [];
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");

  // TODO: implement.
  return [];
}

export function parseResearchState(value: unknown): ResearchState {
  return parseEnum(ResearchState, value);
}

export function parseResourceForm(value: unknown): ResourceForm {
  return parseEnum(ResourceForm, value);
}

export function parseResourceForms(value: unknown): ResourceForm[] {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return [];
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");

  return collection.data.map((raw) => parseResourceForm(raw));
}

export function parseRotation3D(value: unknown): Rotation3D {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  const mapEnts = parseRawCollection(value);
  assert(mapEnts.type === "map");
  const map = Object.fromEntries(mapEnts.data);

  const pitch = parseNumber(map.Pitch);
  const yaw = parseNumber(map.Yaw);
  const roll = parseNumber(map.Roll);

  return { pitch, yaw, roll };
}

export function parseRotation3Dxyz(value: unknown): Rotation3D {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  const mapEnts = parseRawCollection(value);
  assert(mapEnts.type === "map");
  const map = Object.fromEntries(mapEnts.data);

  const roll = parseNumber(map.X);
  const pitch = parseNumber(map.Y);
  const yaw = parseNumber(map.Z);

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

export function parseSubCategories(value: unknown): SubCategory[] {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()") {
    return [];
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");

  // TODO: implement.
  return [];
}

export function parseTransform3D(value: unknown): Transform3D {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  const mapEnts = parseRawCollection(value);
  assert(mapEnts.type === "map");
  const map = Object.fromEntries(mapEnts.data);

  const translation = parsePoint3D(map.Translation);
  const rotation = parseRotation3Dxyz(map.Rotation);
  const scale = parsePoint3D(map.Scale3D);

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

export function parseWireConnections(value: unknown): WireConnection[] {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );

  if (value === "" || value === "()" || value === "None") {
    return [];
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");

  // TODO: implement.
  return [];
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
