import type * as uom from "effect-uom";

import type { VendorData } from "~/game-data/parsers/vendorData/types";
import type {
  AssertPath,
  ClassName,
  Int,
  ItemForm,
  ResourceSinkPoint,
} from "~/types";

export type PowerInfo = {
  min: uom.Mega<uom.Watt>;
  max: uom.Mega<uom.Watt>;
};

export type OverclockInfo = {
  canChange: boolean;
  min: uom.Unitless;
  max: uom.Unitless;
  slots: Int;
  exponent: uom.Unitless;
};

export type SloopInfo = {
  canChange: boolean;
  base: uom.Unitless;
  multiplier: uom.Unitless;
  slots: Int;
  exponent: uom.Unitless;
};

export type ItemAmounts = ReadonlyMap<Item, Int>;

export type WithNativeClass = {
  nativeClass: VendorData["nativeClass"];
};

export type Base = {
  className: ClassName;
};

export type Named = Base & {
  displayName: string;
};

export type Item = Named & {
  form: ItemForm;
  energyValue: uom.Mega<uom.Joule>;
  radioactiveDecay: uom.Gray;
  icon: AssertPath | null;
  resourceSinkPoints: ResourceSinkPoint;
};

export type Buildable = Named & {
  building: Building;
  displayName: string;
};

export type Machine = Buildable & {
  power: PowerInfo;
  overclock: OverclockInfo;
  sloop: SloopInfo;
};

export type SinkMachine = Machine & {};

export type ProductionMachine = Machine & {};

export type GeneratorFuelMachine = Machine & {};

export type GeneratorGeoThermalMachine = Machine & {};

export type Building = Base & {
  buildable: Buildable | null;
  energyValue: uom.Mega<uom.Joule>;
  radioactiveDecay: uom.Gray;
  icon: AssertPath | null;
};

export type Recipe = Named & {
  ingredients: ItemAmounts;
  products: ItemAmounts;
  duration: uom.Second;
  producedIn: ReadonlySet<Machine>;
  variablePowerConsumptionConstant: number;
  variablePowerConsumptionFactor: number;
};

export type Equipment = Base & {};

export type Schematic = Base & {};

export type Vehicle = Base & {};
