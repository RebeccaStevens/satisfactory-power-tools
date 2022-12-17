import type { BuildableGeneratorFuel } from "~/scripts/parse-raw-game-data/parsers";
import type { GeneratorNuclearWarning } from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableGeneratorFuel & {
  mWasteLeftFromCurrentFuel: number;
  mCurrentGeneratorNuclearWarning: GeneratorNuclearWarning;
};
