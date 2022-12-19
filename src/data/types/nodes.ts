import type {
  Id,
  Location3D,
  ResourcePurity,
  Rotation3D,
  Scale3D,
} from "~/data/types";

export type Node = {
  id: Id;
  location: Location3D;
  rotation: Rotation3D;
  scale: Scale3D;
  purity: ResourcePurity;
};
