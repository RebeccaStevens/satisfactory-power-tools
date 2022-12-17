import type { BuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import type { ResourceForm } from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableBuilding & {
  mAllowedResourceForms: Array<ResourceForm>;
  mOnlyAllowCertainResources: boolean;
  mAllowedResources: Array<string>;
  mExtractorTypeName: string | null;
  mTryFindMissingResource: boolean;
};
