import type {
  StackSize,
  ResourceForm,
  Color,
  ScannableType,
  SubCategory,
} from "~/data/core/types";

export type Data = {
  ClassName: string;
  mDisplayName: string;
  mDescription: string;
  mAbbreviatedDisplayName: string;
  mStackSize: StackSize;
  mCanBeDiscarded: boolean;
  mRememberPickUp: boolean;
  mEnergyValue: number;
  mRadioactiveDecay: number;
  mForm: ResourceForm;
  mSmallIcon: string;
  mPersistentBigIcon: string;
  mCrosshairMaterial: string | null;
  mDescriptorStatBars: string;
  mSubCategories: Set<SubCategory>;
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
