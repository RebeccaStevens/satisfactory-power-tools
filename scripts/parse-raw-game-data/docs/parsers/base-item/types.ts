import type { Base } from "~/scripts/parse-raw-game-data/docs/parsers";
import type {
  StackSize,
  ResourceForm,
  Color,
  ScannableType,
  SubCategory,
} from "~/scripts/parse-raw-game-data/types";

export type Data = Base & {
  mDisplayName: string;
  mDescription: string;
  mAbbreviatedDisplayName: string;
  mStackSize: StackSize;
  mCanBeDiscarded: boolean;
  mRememberPickUp: boolean;
  mEnergyValue: number;
  mRadioactiveDecay: number;
  mForm: ResourceForm;
  mSmallIcon: string | null;
  mPersistentBigIcon: string | null;
  mCrosshairMaterial: string | null;
  mDescriptorStatBars: string;
  mSubCategories: SubCategory[];
  mMenuPriority: number;
  mFluidColor: Color;
  mGasColor: Color;
  mCompatibleItemDescriptors: string;
  mClassToScanFor: string | null;
  mScannableType: ScannableType;
  mShouldOverrideScannerDisplayText: boolean;
  mScannerDisplayText: string;
  mScannerLightColor: Color;
};
