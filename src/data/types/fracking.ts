import {
  type Location3D,
  type ResourcePurity,
  type Rotation3D,
  type Scale3D,
} from "~/data/types";

export type FrackingCore = {
  id: string;
  location: Location3D;
  rotation: Rotation3D;
  scale: Scale3D;
  satellites: Set<FrackingSatellite>;
};

export type FrackingSatellite = {
  id: string;
  location: Location3D;
  rotation: Rotation3D;
  scale: Scale3D;
  purity: ResourcePurity;
};
