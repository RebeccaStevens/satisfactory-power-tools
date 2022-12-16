import type { BuildableBuilding } from "~/data/core/parsers";
import type { FuelAmount, ResourceForm } from "~/data/core/types";

export type Data = BuildableBuilding & {
  mFuelClasses: Set<string>;
  mDefaultFuelClasses: Set<string>;
  mFuel: Set<FuelAmount>;
  mAvailableFuelClasses: Set<string>;
  mFuelResourceForm: ResourceForm;
  mFuelLoadAmount: number;
  mRequiresSupplementalResource: boolean;
  mSupplementalLoadAmount: number;
  mSupplementalToPowerRatio: number;
  mIsFullBlast: boolean;
  mPowerProduction: number;
  mLoadPercentage: number;
};
