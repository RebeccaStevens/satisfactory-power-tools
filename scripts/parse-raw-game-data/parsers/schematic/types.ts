import type { Base } from "~/scripts/parse-raw-game-data/parsers";
import type {
  GamePhase,
  ResourceNodeType,
  SchematicType,
  SubCategory,
} from "~/scripts/parse-raw-game-data/types";

export type Data = Base & {
  mType: SchematicType;
  mDescription: string;
  mSubCategories: Array<SubCategory>;
  mMenuPriority: number;
  mTechTier: number;
  mCost: Record<string, number>;
  mTimeToComplete: number;
  mRelevantShopSchematics: Array<string>;
  mUnlocks: Array<{
    Class: string;
    mScannableObjects?: Set<{
      ItemDescriptor: string;
      ActorsAllowedToScan: Array<string>;
    }>;
    mRecipes?: Array<string>;
    mResourcesToAddToScanner?: Array<string>;
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
        mSchematics: Array<string>;
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
