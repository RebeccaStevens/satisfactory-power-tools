import { assert } from "chai";

import {
  isPMap,
  type PList,
  type PMap,
} from "~/scripts/parse-raw-game-data/docs/raw-collection-parser";
import { parseRawCollection } from "~/scripts/parse-raw-game-data/docs/raw-collection-parser";
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
  GeneratorNuclearWarning,
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
  ResourcePurity,
} from "~/scripts/parse-raw-game-data/types";
import {
  type AttachmentPoint,
  type Color,
  type Material,
  type OcclusionBoxInfo,
  type Point2D,
  type Point3D,
  type SubCategory,
  type Vector2D,
  type Vector3D,
  type Rotation3D,
  type PipeConnection,
  type Spline,
  type WireConnection,
  type PowerConnection,
  type Transform3D,
  type MinMax,
  type BeltConnection,
  type Scale3D,
  type RailroadConnection,
  type LightControlData,
  type Translation3D,
} from "~/scripts/parse-raw-game-data/types";
import { isNotNull } from "~/utils";

export function parseAmounts(value: string): Record<string, number> {
  if (value === "" || value === "()") {
    return {};
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");
  return parseAmountsImpl(collection);
}

function parseAmountsImpl(collection: PList): Record<string, number> {
  return Object.fromEntries(
    collection.data.flatMap((itemAmountEnts) => {
      assert(isPMap(itemAmountEnts), "expected PMap");
      const itemAmount = Object.fromEntries(itemAmountEnts.data);

      assert(
        typeof itemAmount.Amount === "string" ||
          itemAmount.Amount === undefined,
      );
      assert(typeof itemAmount.ItemClass === "string");

      const amount = itemAmount.Amount;
      const itemClass = parseClass(itemAmount.ItemClass);
      assert(isNotNull(itemClass), "expected non-null");
      return [
        [itemClass, amount === undefined ? 0 : parseNumber(amount)] as const,
      ];
    }),
  );
}

export function parseAttachmentPoints(value: string): AttachmentPoint[] {
  if (value === "" || value === "()") {
    return [];
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");
  return parseAttachmentPointsImpl(collection);
}

function parseAttachmentPointsImpl(collection: PList): AttachmentPoint[] {
  // TODO: implement.
  return [];
}

export function parseAttachmentSocket(value: string): AttachmentSocket | null {
  if (value === "None") {
    return null;
  }
  return parseEnum(AttachmentSocket, value);
}

export function parseBatteryStatus(value: string): BatteryStatus {
  return parseEnum(BatteryStatus, value);
}

export function parseBeltConnections(value: string): BeltConnection[] {
  if (value === "" || value === "()") {
    return [];
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");
  return parseBeltConnectionsImpl(collection);
}

function parseBeltConnectionsImpl(value: PList): BeltConnection[] {
  // TODO: implement.
  return [];
}

export function parseBoolean(value: string): boolean {
  assert(
    value === "False" || value === "True" || value === "0" || value === "1",
  );
  return value === "True" || value === "1";
}

export function parseClasses(value: string): string[] {
  if (value === "" || value === "()") {
    return [];
  }

  const list = parseRawCollection(value);
  assert(list.type === "list");
  return parseClassesImpl(list);
}

function parseClassesImpl(list: PList): string[] {
  return list.data
    .map((item) => {
      assert(typeof item === "string");
      return parseClass(item);
    })
    .filter(isNotNull);
}

export function parseClass(value: string): string | null {
  if (value === "None") {
    return null;
  }

  const path = value.replace(/^[\d./A-Za-z]+'"(.+)"'$/u, "$1");
  assert(path.startsWith("/"));

  return path.slice(path.lastIndexOf(".") + 1);
}

export function parseIcon(value: string): string | null {
  if (value === "" || value === "None") {
    return null;
  }

  if (value.startsWith("(")) {
    const map = parseRawCollection(value);
    assert(map.type === "map");
    const data = Object.fromEntries(map.data);
    if (data.ResourceObject === undefined) {
      return null;
    }
    assert(typeof data.ResourceObject === "string");
    return parseIcon(data.ResourceObject);
  }

  const macth = /^(?:\/Script\/Engine\.)?Texture2D[ "']*\/(.*)\..*$/u.exec(
    value,
  );
  assert(macth !== null);
  const v = macth[1];
  assert(v !== undefined);

  return v;
}

export function parseColor(value: string): Color {
  const map = parseRawCollection(value);
  assert(isPMap(map), "expected PMap");
  return parseColorImpl(map);
}

function parseColorImpl(value: PMap): Color {
  const data = Object.fromEntries(value.data);

  assert(typeof data.R === "string");
  assert(typeof data.G === "string");
  assert(typeof data.B === "string");
  assert(typeof data.A === "string");

  const red = parseNumber(data.R);
  const green = parseNumber(data.G);
  const blue = parseNumber(data.B);
  const alpha = parseNumber(data.A);

  return { red, green, blue, alpha };
}

export function parseCustomScaleType(value: string): CustomScaleType {
  return parseEnum(CustomScaleType, value);
}

export function parseDirectionBooleanMap(
  value: string,
): Record<"Front" | "Bottom" | "Back" | "Top" | "Left" | "Right", boolean> {
  if (value === "" || value === "()") {
    return parseDirectionBooleanMapImpl({ type: "map", data: [] });
  }

  const map = parseRawCollection(value);
  assert(isPMap(map), "expected PMap");
  return parseDirectionBooleanMapImpl(map);
}

function parseDirectionBooleanMapImpl(
  map: PMap,
): Record<"Front" | "Bottom" | "Back" | "Top" | "Left" | "Right", boolean> {
  const data = Object.fromEntries(map.data as Array<[string, string]>);

  return Object.fromEntries(
    ["Front", "Bottom", "Back", "Top", "Left", "Right"].map((dir) => {
      const value = data[dir];
      return [dir, value === undefined ? false : parseBoolean(value)];
    }),
  );
}

export function parseEquipmentSlot(value: string): EquipmentSlot {
  return parseEnum(EquipmentSlot, value);
}

export function parseExtractorType(value: string): ExtractorType | null {
  if (value === "None") {
    return null;
  }
  return parseEnum(ExtractorType, value);
}

export function parseFalsableNumber(value: string): number | false {
  return parseFalsableNumberImpl(parseNumber(value));
}

function parseFalsableNumberImpl(number: number): number | false {
  return number < 0 ? false : number;
}

export function parseFreightCargoType(value: string): FreightCargoType {
  return parseEnum(FreightCargoType, value);
}

export function parseGameEvent(value: string): GameEvent {
  return parseEnum(GameEvent, value);
}

export function parseGameEvents(value: string): GameEvent[] {
  if (value === "" || value === "()") {
    return [];
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");
  return parseGameEventsImpl(collection);
}

function parseGameEventsImpl(collection: PList): GameEvent[] {
  return collection.data.map((raw) => {
    assert(typeof raw === "string");
    return parseGameEvent(raw);
  });
}

export function parseGamePhase(value: string): GamePhase {
  return parseEnum(GamePhase, value);
}

export function parseGeneratorNuclearWarning(
  value: string,
): GeneratorNuclearWarning {
  return parseEnum(GeneratorNuclearWarning, value);
}

export function parseHoverMode(value: string): HoverMode {
  return parseEnum(HoverMode, value);
}

export function parseItemTransferringStage(
  value: string,
): ItemTransferringStage {
  return parseEnum(ItemTransferringStage, value);
}

export function parseLightControlData(value: string): LightControlData {
  const map = parseRawCollection(value);
  assert(map.type === "map");
  return parseLightControlDataImpl(map);
}

function parseLightControlDataImpl(map: PMap): LightControlData {
  const data = Object.fromEntries(map.data);

  assert(typeof data.Intensity === "string");

  return {
    Intensity: parseNumber(data.Intensity),
  };
}

export function parseMaterials(value: string): Material[] {
  if (value === "" || value === "()") {
    return [];
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");
  return parseMaterialsImpl(collection);
}

function parseMaterialsImpl(value: PList): Material[] {
  // TODO: implement.
  return [];
}

export function parseMinMaxNumber(value: string): MinMax<number> {
  const collection = parseRawCollection(value);
  assert(collection.type === "map");
  return parseMinMaxNumberImpl(collection);
}

export function parseMinMaxNumberImpl(value: PMap): MinMax<number> {
  const data = Object.fromEntries(value.data);

  assert(typeof data.Min === "string");
  assert(typeof data.Max === "string");

  const min = parseNumber(data.Min);
  const max = parseNumber(data.Max);

  return {
    min,
    max,
  };
}

export function parseNullableNumber(value: string): number | null {
  if (value === "") {
    return null;
  }

  return parseNumber(value);
}

export function parseNullableString(value: string): string | null {
  if (value === "" || value === "None" || value === "(None)") {
    return null;
  }
  return value;
}

export function parseNumber(value: string): number {
  assert(/^-?\d+\.?\d*$/u.test(value));
  return Number.parseFloat(value);
}

export function parseOcclusionBoxInfo(value: string): OcclusionBoxInfo[] {
  if (value === "" || value === "()") {
    return [];
  }

  const list = parseRawCollection(value);
  assert(list.type === "list");
  return parseOcclusionBoxInfoImpl(list);
}

function parseOcclusionBoxInfoImpl(list: PList): OcclusionBoxInfo[] {
  return list.data.map((map) => {
    assert(isPMap(map), "expected PMap");
    const data = Object.fromEntries(map.data);

    assert(isPMap(data.Min), "expected PMap");
    assert(isPMap(data.Max), "expected PMap");
    assert(typeof data.IsValid === "string");

    const min = parsePoint3DImpl(data.Min);
    const max = parsePoint3DImpl(data.Max);
    const isValid = parseBoolean(data.IsValid);
    return {
      min,
      max,
      isValid,
    };
  });
}

export function parseOcclusionShape(value: string): OcclusionShape {
  return parseEnum(OcclusionShape, value);
}

export function parsePipeConnections(value: string): PipeConnection[] {
  if (value === "" || value === "()") {
    return [];
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");
  return parsePipeConnectionsImpl(collection);
}

function parsePipeConnectionsImpl(value: PList): PipeConnection[] {
  // TODO: implement.
  return [];
}

export function parsePlatformDockingStatus(
  value: string,
): PlatformDockingStatus {
  return parseEnum(PlatformDockingStatus, value);
}

export function parsePoint2D(value: string): Point2D {
  const map = parseRawCollection(value);
  assert(map.type === "map");
  return parsePoint2DImpl(map);
}

function parsePoint2DImpl(value: PMap): Point2D {
  const data = Object.fromEntries(value.data);

  assert(typeof data.X === "string");
  assert(typeof data.Y === "string");

  const x = parseNumber(data.X);
  const y = parseNumber(data.Y);

  return { x, y };
}

export function parsePoint3D(value: string): Point3D {
  const map = parseRawCollection(value);
  assert(map.type === "map");
  return parsePoint3DImpl(map);
}

function parsePoint3DImpl(value: PMap): Point3D {
  const data = Object.fromEntries(value.data);

  assert(typeof data.X === "string");
  assert(typeof data.Y === "string");
  assert(typeof data.Z === "string");

  const x = parseNumber(data.X);
  const y = parseNumber(data.Y);
  const z = parseNumber(data.Z);

  return { x, y, z };
}

export function parsePowerConnections(value: string): PowerConnection[] {
  if (value === "" || value === "()") {
    return [];
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");
  return parsePowerConnectionsImpl(collection);
}

function parsePowerConnectionsImpl(value: PList): PowerConnection[] {
  // TODO: implement.
  return [];
}

export function parsePowerPoleType(value: string): PowerPoleType {
  return parseEnum(PowerPoleType, value);
}

export function parseRailroadAspect(value: string): RailroadAspect {
  return parseEnum(RailroadAspect, value);
}

export function parseRailroadBlockValidation(
  value: string,
): RailroadBlockValidation {
  return parseEnum(RailroadBlockValidation, value);
}

export function parseRailroadConnections(value: string): RailroadConnection[] {
  if (value === "" || value === "()") {
    return [];
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");
  return parseRailroadConnectionsImpl(collection);
}

function parseRailroadConnectionsImpl(value: PList): RailroadConnection[] {
  // TODO: implement.
  return [];
}

export function parseResearchState(value: string): ResearchState {
  return parseEnum(ResearchState, value);
}

export function parseResourceForm(value: string): ResourceForm {
  return parseEnum(ResourceForm, value);
}

export function parseResourceForms(value: string): ResourceForm[] {
  if (value === "" || value === "()") {
    return [];
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");
  return parseResourceFormsImpl(collection);
}

function parseResourceFormsImpl(collection: PList): ResourceForm[] {
  return collection.data.map((raw) => {
    assert(typeof raw === "string");
    return parseResourceForm(raw);
  });
}

export function parseResourcePurity(value: string): ResourcePurity {
  return parseEnum(ResourcePurity, value);
}

export function parseRotation3D(value: string): Rotation3D {
  const collection = parseRawCollection(value);
  assert(collection.type === "map");
  return parseRotation3DImpl(collection);
}

function parseRotation3DImpl(value: PMap): Rotation3D {
  const data = Object.fromEntries(value.data);

  assert(typeof data.Pitch === "string");
  assert(typeof data.Yaw === "string");
  assert(typeof data.Roll === "string");

  const pitch = parseNumber(data.Pitch);
  const yaw = parseNumber(data.Yaw);
  const roll = parseNumber(data.Roll);

  return { pitch, yaw, roll };
}

export function parseRotation3Dxyz(value: string): Rotation3D {
  const collection = parseRawCollection(value);
  assert(collection.type === "map");
  return parseRotation3DxyzImpl(collection);
}

function parseRotation3DxyzImpl(value: PMap): Rotation3D {
  const data = Object.fromEntries(value.data);

  assert(typeof data.X === "string");
  assert(typeof data.Y === "string");
  assert(typeof data.Z === "string");

  const roll = parseNumber(data.X);
  const pitch = parseNumber(data.Y);
  const yaw = parseNumber(data.Z);

  return { pitch, yaw, roll };
}

export function parseScale3D(value: string): Scale3D {
  return parsePoint3D(value);
}

export function parseScannableType(value: string): ScannableType {
  return parseEnum(ScannableType, value);
}

export function parseSchematicType(value: string): SchematicType {
  return parseEnum(SchematicType, value);
}

export function parseSpline(value: string): Spline {
  // TODO: implement.
  return {};
}

export function parseStackSize(value: string): StackSize {
  return parseEnum(StackSize, value);
}

export function parseStairDirection(value: string): StairDirection {
  return parseEnum(StairDirection, value);
}

export function parseString(value: string): string {
  return value;
}

export function parseSubCategories(value: string): SubCategory[] {
  if (value === "" || value === "()") {
    return [];
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");
  return parseSubCategoriesImpl(collection);
}

function parseSubCategoriesImpl(value: PList): SubCategory[] {
  return value.data
    .map((category) => {
      assert(typeof category === "string");
      return parseClass(category);
    })
    .filter(isNotNull);
}

export function parseTransform3D(value: string): Transform3D {
  const collection = parseRawCollection(value);
  assert(collection.type === "map");
  return parseTransform3DImpl(collection);
}

export function parseTransform3DImpl(value: PMap): Transform3D {
  const data = Object.fromEntries(value.data);

  assert(isPMap(data.Translation), "expected PMap");
  assert(isPMap(data.Rotation), "expected PMap");
  assert(isPMap(data.Scale3D), "expected PMap");

  const translation = parsePoint3DImpl(data.Translation);
  const rotation = parseRotation3DxyzImpl(data.Rotation);
  const scale = parsePoint3DImpl(data.Scale3D);

  return {
    translation,
    rotation,
    scale,
  };
}

export function parseTranslation3D(value: string): Translation3D {
  return parsePoint3D(value);
}

export function parseVector2D(value: string): Vector2D {
  return parsePoint2D(value);
}

export function parseVector3D(value: string): Vector3D {
  return parsePoint3D(value);
}

export function parseWallType(value: string): WallType {
  return parseEnum(WallType, value);
}

export function parseWeaponState(value: string): WeaponState {
  return parseEnum(WeaponState, value);
}

export function parseWireConnections(value: string): WireConnection[] {
  if (value === "" || value === "()" || value === "None") {
    return [];
  }

  const collection = parseRawCollection(value);
  assert(collection.type === "list");
  return parseWireConnectionsImpl(collection);
}

export function parseWireConnectionsImpl(value: unknown): WireConnection[] {
  // TODO: implement.
  return [];
}

function parseEnum<T>(enumObject: StandardEnum<T>, value: unknown): T {
  assert(
    typeof value === "string",
    `expected type: string, actual type: ${typeof value}`,
  );
  assert(Object.values(enumObject).includes(value), `Invalid value: ${value}`);
  return value as T;
}

type StandardEnum<T> = {
  [id: string]: T | string;
  [nu: number]: string;
};

export function quaternionToAttitude({
  x,
  y,
  z,
  w,
}: Readonly<{ x: number; y: number; z: number; w: number }>) {
  const roll = Math.atan2(2 * (x * y + z * w), 1 - 2 * (y ** 2 + z ** 2));
  const pitch = Math.asin(2 * (x * z - w * y));
  const yaw = Math.atan2(2 * (x * w + y * z), 1 - 2 * (z ** 2 + w ** 2));

  return { roll, pitch, yaw };
}
