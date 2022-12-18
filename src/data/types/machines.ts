import type {
  Id,
  Name,
  Hz,
  MegaWatts,
  PowerExponent,
  Seconds,
  Potential,
} from "~/data/types";

export type Machine = {
  id: Id;
  name: Name;
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
