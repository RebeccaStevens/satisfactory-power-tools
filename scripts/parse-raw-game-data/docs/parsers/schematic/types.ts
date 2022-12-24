import type { Base } from "~/scripts/parse-raw-game-data/docs/parsers";
import type {
  GamePhase,
  ResourceNodeType,
  SchematicType,
  SubCategory,
} from "~/scripts/parse-raw-game-data/types";

export type Data = Base & {
  mType: SchematicType;
  mDescription: string;
  mSubCategories: SubCategory[];
  mMenuPriority: number;
  mTechTier: number;
  mCost: Record<string, number>;
  mTimeToComplete: number;
  mRelevantShopSchematics: string[];
  mUnlocks: Array<{
    Class: string;
    mScannableObjects?: Set<{
      ItemDescriptor: string;
      ActorsAllowedToScan: string[];
    }>;
    mRecipes?: string[];
    mResourcesToAddToScanner?: string[];
    mResourcePairsToAddToScanner?: Set<{
      ResourceDescriptor: string;
      ResourceNodeType: ResourceNodeType;
    }>;
    mNumInventorySlotsToUnlock?: number;
  }>;
  mSchematicIcon: string | null;
  mSmallSchematicIcon: string | null;
  mSchematicDependencies: Array<
    | {
        Class: string;
        mSchematics: string[];
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
