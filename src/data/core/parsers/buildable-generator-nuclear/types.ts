import type { BuildableGeneratorFuel } from "~/data/core/parsers";
import type { GeneratorNuclearWarning } from "~/data/core/types";

export type Data = BuildableGeneratorFuel & {
  mWasteLeftFromCurrentFuel: number;
  mCurrentGeneratorNuclearWarning: GeneratorNuclearWarning;
};
