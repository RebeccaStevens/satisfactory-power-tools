import type { BuildableLightSource } from "~/data/core/parsers";

export type Data = BuildableLightSource & {
  mFixtureAngle: number;
};
