import { type BuildableBuilding } from "~/scripts/parse-raw-game-data/docs/parsers";
import {
  type FuelAmount,
  type ResourceForm,
} from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableBuilding & {
  mFuelClasses: string[];
  mDefaultFuelClasses: string[];
  mFuel: FuelAmount[];
  mAvailableFuelClasses: string[];
  mFuelResourceForm: ResourceForm;
  mFuelLoadAmount: number;
  mRequiresSupplementalResource: boolean;
  mSupplementalLoadAmount: number;
  mSupplementalToPowerRatio: number;
  mIsFullBlast: boolean;
  mPowerProduction: number;
  mLoadPercentage: number;
};
