import type { BuildableBuilding } from "~/scripts/parse-raw-game-data/parsers";
import type {
  FuelAmount,
  ResourceForm,
} from "~/scripts/parse-raw-game-data/types";

export type Data = BuildableBuilding & {
  mFuelClasses: Array<string>;
  mDefaultFuelClasses: Array<string>;
  mFuel: Array<FuelAmount>;
  mAvailableFuelClasses: Array<string>;
  mFuelResourceForm: ResourceForm;
  mFuelLoadAmount: number;
  mRequiresSupplementalResource: boolean;
  mSupplementalLoadAmount: number;
  mSupplementalToPowerRatio: number;
  mIsFullBlast: boolean;
  mPowerProduction: number;
  mLoadPercentage: number;
};
