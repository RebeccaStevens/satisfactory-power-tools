import {
  type Location3D,
  type ResourcePurity,
  type Rotation3D,
  type Scale3D,
} from "~/data/types";

export type Geyser = {
  id: string;
  location: Location3D;
  rotation: Rotation3D;
  scale: Scale3D;
  purity: ResourcePurity;
};
