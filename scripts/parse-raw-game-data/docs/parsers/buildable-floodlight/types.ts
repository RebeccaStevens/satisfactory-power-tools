import { type BuildableLightSource } from "~/scripts/parse-raw-game-data/docs/parsers";

export type Data = BuildableLightSource & {
  mFixtureAngle: number;
};
