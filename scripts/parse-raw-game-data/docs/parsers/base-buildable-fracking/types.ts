import type { BuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import type { ResourceForm } from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableBuilding & {
  mAllowedResourceForms: ResourceForm[];
  mOnlyAllowCertainResources: boolean;
  mAllowedResources: string[];
  mExtractorTypeName: string | null;
  mTryFindMissingResource: boolean;
};
