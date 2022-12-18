import type { Id, Machine } from "~/data/types";
import {
  asId,
  asName,
  asHz,
  asMegaWatts,
  asPowerExponent,
  asSeconds,
  asPotential,
} from "~/data/types";

import type RawGameData from "./game-data.json";

export function getMachines(
  rawMachines: Readonly<typeof RawGameData["machines"]>,
) {
  return new Map(
    Object.entries(rawMachines).map(([rawId, data]): [Id, Machine] => {
      const id = asId(rawId);
      const name = asName(data.name);
      const manufacturingSpeed = asHz(data.manufacturingSpeed);
      const powerConsumption = asMegaWatts(data.powerConsumption);
      const minPowerConsumption = asMegaWatts(data.minPowerConsumption);
      const maxPowerConsumption = asMegaWatts(data.maxPowerConsumption);
      const powerConsumptionExponent = asPowerExponent(
        data.powerConsumptionExponent,
      );
      const minimumProducingTime = asSeconds(data.minimumProducingTime);
      const minPotential = asPotential(data.minPotential);
      const maxPotential = asPotential(data.maxPotential);
      const maxPotentialIncreasePerCrystal = asPotential(
        data.maxPotentialIncreasePerCrystal,
      );
      return [
        id,
        {
          id,
          name,
          manufacturingSpeed,
          powerConsumption,
          minPowerConsumption,
          maxPowerConsumption,
          powerConsumptionExponent,
          minimumProducingTime,
          minPotential,
          maxPotential,
          maxPotentialIncreasePerCrystal,
        },
      ];
    }),
  );
}
