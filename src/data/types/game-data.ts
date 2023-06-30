import {
  type GeneralItem,
  type ProductionMachine,
  type Recipe,
} from "~/data/types";

export type GameData = {
  items: Map<string, GeneralItem>;
  machines: Map<string, ProductionMachine>;
  recipes: Map<string, Recipe>;
};

export type Idable = {
  id: string;
};

export type Displayable = Idable & {
  icon: string | null;
  categories: string[];
  menuPriority: number;
};
