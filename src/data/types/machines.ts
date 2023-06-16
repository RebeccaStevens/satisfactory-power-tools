import {
  type Hz,
  type MegaWatts,
  type PowerExponent,
  type Seconds,
  type Potential,
} from "~/data/types";

export type Machine = {
  id: string;
  manufacturingSpeed: Hz;
  powerConsumption: MegaWatts;
  minPowerConsumption: MegaWatts;
  maxPowerConsumption: MegaWatts;
  powerConsumptionExponent: PowerExponent;
  minimumProducingTime: Seconds;
  minPotential: Potential;
  maxPotential: Potential;
  maxPotentialIncreasePerCrystal: Potential;
};
