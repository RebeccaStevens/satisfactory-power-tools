import type { MegaJoules, ColorString, ItemTransporter } from "~/data/types";

export type Item = {
  id: string;
  energy: MegaJoules;
  points: number;
  transporter: ItemTransporter;
  color: ColorString;
  icon: string | null;
  tier: number | null;
  typeId: string | null;
};
