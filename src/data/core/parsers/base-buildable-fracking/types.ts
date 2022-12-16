import type { BuildableBuilding } from "~/data/core/parsers";
import type { ResourceForm } from "~/data/core/types";

export type Data = BuildableBuilding & {
  mAllowedResourceForms: Set<ResourceForm>;
  mOnlyAllowCertainResources: boolean;
  mAllowedResources: Set<string>;
  mExtractorTypeName: string | null;
  mTryFindMissingResource: boolean;
};
