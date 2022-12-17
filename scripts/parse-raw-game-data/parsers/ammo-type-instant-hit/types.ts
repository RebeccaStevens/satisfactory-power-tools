import type { BaseAmmoType } from "~/scripts/parse-raw-game-data/parsers";

export type Data = BaseAmmoType & {
  mPlayFireEffects: boolean;
};
