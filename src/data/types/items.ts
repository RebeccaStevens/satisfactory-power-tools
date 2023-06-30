import {
  type Displayable,
  type MegaJoules,
  type ColorString,
  type ItemTransporter,
} from "~/data/types";

export type Item = Displayable & {
  transporter: ItemTransporter | null;
};

export type SpecialItem = Item;

export type GeneralItem = Item & {
  energy: MegaJoules;
  sinkable: boolean;
  points: number;
  color: ColorString;
  tier: number | null;
  typeId: string | null;
};

export function isGeneralItem(item: Item): item is GeneralItem {
  return "points" in item;
}
