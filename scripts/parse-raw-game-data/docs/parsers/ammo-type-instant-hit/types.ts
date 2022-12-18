import type { BaseAmmoType } from "~/scripts/parse-raw-game-data/docs/parsers";

export type Data = BaseAmmoType & {
  mPlayFireEffects: boolean;
};
