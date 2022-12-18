import type {
  Id,
  Name,
  MegaJoules,
  Points,
  ColorString,
  ItemTransporter,
} from "~/data/types";

export type Item = {
  id: Id;
  name: Name;
  energy: MegaJoules;
  points: Points;
  transporter: ItemTransporter;
  color: ColorString;
};
