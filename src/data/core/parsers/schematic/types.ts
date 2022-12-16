import type {
  GamePhase,
  ResourceNodeType,
  SchematicType,
  SubCategory,
} from "~/data/core/types";

export type Data = {
  ClassName: string;
  mType: SchematicType;
  mDisplayName: string;
  mDescription: string;
  mSubCategories: Set<SubCategory>;
  mMenuPriority: number;
  mTechTier: number;
  mCost: Map<string, number>;
  mTimeToComplete: number;
  mRelevantShopSchematics: Set<string>;
  mUnlocks: Set<{
    Class: string;
    mScannableObjects?: Set<{
      ItemDescriptor: string;
      ActorsAllowedToScan: Set<string>;
    }>;
    mRecipes?: Set<string>;
    mResourcesToAddToScanner?: Set<string>;
    mResourcePairsToAddToScanner?: Set<{
      ResourceDescriptor: string;
      ResourceNodeType: ResourceNodeType;
    }>;
    mNumInventorySlotsToUnlock?: number;
  }>;
  mSchematicIcon: string;
  mSmallSchematicIcon: string | null;
  mSchematicDependencies: Set<
    | {
        Class: string;
        mSchematics: Set<string>;
        mRequireAllSchematicsToBePurchased: boolean;
      }
    | {
        Class: string;
        mGamePhase: GamePhase;
      }
  >;
  mDependenciesBlocksSchematicAccess: boolean;
  mHiddenUntilDependenciesMet: boolean;
};
