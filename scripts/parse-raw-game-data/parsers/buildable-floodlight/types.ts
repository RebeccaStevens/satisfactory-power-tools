import type { BuildableLightSource } from "~/scripts/parse-raw-game-data/parsers";

export type Data = BuildableLightSource & {
  mFixtureAngle: number;
};
