export type AttachmentPoint = {};

export enum AttachmentSocket {
  HandLeft = "hand_lSocket",
  HandRight = "hand_rSocket",
  Legs = "jumpingStilt_lSocket",
  Helmet = "helmetSocket",
  Root = "root",
}

export enum BatteryStatus {
  Idle = "BS_Idle",
}

export type BeltConnection = {};

export type Color = {
  red: number;
  green: number;
  blue: number;
  alpha: number;
};

export enum CustomScaleType {
  Center = "ROCSS_Center",
  Top = "ROCSS_Top",
  Bottom = "ROCSS_Bot",
}

export type DirectionBooleanMap = Record<
  "Front" | "Bottom" | "Back" | "Top" | "Left" | "Right",
  boolean
>;

export enum EquipmentSlot {
  Arms = "ES_ARMS",
  Body = "ES_BODY",
  Back = "ES_BACK",
  Legs = "ES_LEGS",
  Head = "ES_HEAD",
}

export enum ExtractorType {
  Miner = "Miner",
}

export enum FreightCargoType {
  Standard = "FCT_Standard",
  Liquid = "FCT_Liquid",
}

export type FuelAmount = {
  mFuelClass: string;
  mSupplementalResourceClass: string;
} & (
  | {
      mByproduct: string;
      mByproductAmount: number;
    }
  | {
      mByproduct: null;
      mByproductAmount: null;
    }
);

export enum GameEvent {
  Christmas = "EV_Christmas",
}

export enum GamePhase {
  FoodCourt = "EGP_FoodCourt",
}

export enum GeneratorNuclearWarning {
  None = "GNW_None",
}

export enum HoverMode {
  Inactive = "HPM_Inactive",
}

export enum ItemTransferringStage {
  None = "ITS_NONE",
}

export type LightControlData = {
  Intensity: number;
};

export type Material = {
  id: string;
};

export type MinMax<T> = {
  min: T;
  max: T;
};

export type OcclusionBoxInfo = {
  min: Point3D;
  max: Point3D;
  isValid: boolean;
};

export enum OcclusionShape {
  Box = "ROCS_Box",
  BoxSpecial = "ROCS_Box_Special",
  Ramp = "ROCS_Ramp",
  CornerRamp = "ROCS_CornerRamp",
}

export type PipeConnection = {};

export enum PlatformDockingStatus {
  None = "ETPDS_None",
}

export type Point2D = {
  x: number;
  y: number;
};

export type Point3D = {
  x: number;
  y: number;
  z: number;
};

export type PowerConnection = {};

export enum PowerPoleType {
  Pole = "PPT_POLE",
  WallSingle = "PPT_WALL",
  WallDouble = "PPT_WALL_DOUBLE",
}

export enum RailroadAspect {
  None = "RSA_None",
}

export enum RailroadBlockValidation {
  Unvalidated = "RBV_Unvalidated",
}

export type RailroadConnection = {};

export enum ResearchState {
  NotResearching = "ERS_NotResearching",
}

export enum ResourceForm {
  Solid = "RF_SOLID",
  Liquid = "RF_LIQUID",
  Gas = "RF_GAS",
  Heat = "RF_HEAT",
  Invalid = "RF_INVALID",
}

export enum ResourceNodeType {
  Node = "Node",
  Geyser = "Geyser",
  FrackingCore = "FrackingCore",
}

export enum ResourcePurity {
  Impure = "RP_Inpure",
  Normal = "RP_Normal",
  Pure = "RP_Pure",
}

export type Rotation3D = {
  pitch: number;
  yaw: number;
  roll: number;
};

export type Scale3D = {
  x: number;
  y: number;
  z: number;
};

export enum ScannableType {
  Default = "RTWOT_Default",
  Flora = "RTWOT_Flora",
  WeakSignal = "RTWOT_WeakSignal",
}

export enum SchematicType {
  Custom = "EST_Custom",
  HardDrive = "EST_HardDrive",
  MAM = "EST_MAM",
  Milestone = "EST_Milestone",
  Tutorial = "EST_Tutorial",
  Alternate = "EST_Alternate",
  ResourceSink = "EST_ResourceSink",
}

export type Spline = {};

export enum StackSize {
  One = "SS_ONE",
  Small = "SS_SMALL",
  Medium = "SS_MEDIUM",
  Big = "SS_BIG",
  Huge = "SS_HUGE",
  Fluid = "SS_FLUID",
}

export enum StairDirection {
  Left = "EBSD_Left",
  Right = "EBSD_Right",
}

export type SubCategory = {};

export type Transform3D = {
  rotation: Rotation3D;
  translation: Translation3D;
  scale: Scale3D;
};

export type Translation3D = Point3D;

export type Vector2D = Point2D;

export type Vector3D = Point3D;

export enum WallType {
  DiagonalDown = "BWT_DiagonalDown",
  DiagonalUp = "BWT_DiagonalUp",
  Frame = "BWT_Frame",
  Glass = "BWT_Glass",
  Normal = "BWT_Normal",
}

export enum WeaponState {
  Unequipped = "EWS_Unequipped",
}

export type WireConnection = {};
