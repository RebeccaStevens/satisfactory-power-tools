import { wire, type SpecialItem } from "./types";

export const energy = {
  id: "energy",
  icon: "buildings/powerline",
  categories: [],
  menuPriority: 0,
  transporter: wire,
} satisfies SpecialItem;

export const points = {
  id: "points",
  icon: "other/desc_ficsit_coupon",
  categories: [],
  menuPriority: 0,
  transporter: null,
} satisfies SpecialItem;

export const specialItems: Readonly<
  ReadonlyMap<string, Readonly<SpecialItem>>
> = new Map<string, Readonly<SpecialItem>>([
  [energy.id, energy],
  [points.id, points],
]);
