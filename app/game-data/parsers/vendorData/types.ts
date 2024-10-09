import type { FGAmmoTypeInstantHit } from "../FGAmmoTypeInstantHit";
import type { FGAmmoTypeProjectile } from "../FGAmmoTypeProjectile";
import type { FGAmmoTypeSpreadshot } from "../FGAmmoTypeSpreadshot";
import type { FGBuildable } from "../FGBuildable";
import type { FGBuildableFactory } from "../FGBuildableFactory";
import type { FGBuildableFactoryBuilding } from "../FGBuildableFactoryBuilding";
import type { FGBuildableFactorySimpleProducer } from "../FGBuildableFactorySimpleProducer";
import type { FGBuildableFrackingActivator } from "../FGBuildableFrackingActivator";
import type { FGBuildableFrackingExtractor } from "../FGBuildableFrackingExtractor";
import type { FGBuildableGeneratorFuel } from "../FGBuildableGeneratorFuel";
import type { FGBuildableGeneratorGeoThermal } from "../FGBuildableGeneratorGeoThermal";
import type { FGBuildableGeneratorNuclear } from "../FGBuildableGeneratorNuclear";
import type { FGBuildableManufacturer } from "../FGBuildableManufacturer";
import type { FGBuildableManufacturerVariablePower } from "../FGBuildableManufacturerVariablePower";
import type { FGBuildableResourceExtractor } from "../FGBuildableResourceExtractor";
import type { FGBuildableResourceSink } from "../FGBuildableResourceSink";
import type { FGBuildingDescriptor } from "../FGBuildingDescriptor";
import type { FGConsumableDescriptor } from "../FGConsumableDescriptor";
import type { FGCustomizationRecipe } from "../FGCustomizationRecipe";
import type { FGEquipmentDescriptor } from "../FGEquipmentDescriptor";
import type { FGItemDescriptor } from "../FGItemDescriptor";
import type { FGItemDescriptorBiomass } from "../FGItemDescriptorBiomass";
import type { FGItemDescriptorNuclearFuel } from "../FGItemDescriptorNuclearFuel";
import type { FGItemDescriptorPowerBoosterFuel } from "../FGItemDescriptorPowerBoosterFuel";
import type { FGPowerShardDescriptor } from "../FGPowerShardDescriptor";
import type { FGRecipe } from "../FGRecipe";
import type { FGResourceDescriptor } from "../FGResourceDescriptor";

export type VendorDataShape = {
  NativeClass: string;
  Classes: unknown[];
};

export type VendorData =
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildingDescriptor'";
      classes: FGBuildingDescriptor[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptor'";
      classes: FGItemDescriptor[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorBiomass'";
      classes: FGItemDescriptorBiomass[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorNuclearFuel'";
      classes: FGItemDescriptorNuclearFuel[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorPowerBoosterFuel'";
      classes: FGItemDescriptorPowerBoosterFuel[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGResourceDescriptor'";
      classes: FGResourceDescriptor[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGConsumableDescriptor'";
      classes: FGConsumableDescriptor[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentDescriptor'";
      classes: FGEquipmentDescriptor[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGPowerShardDescriptor'";
      classes: FGPowerShardDescriptor[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeInstantHit'";
      classes: FGAmmoTypeInstantHit[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeProjectile'";
      classes: FGAmmoTypeProjectile[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeSpreadshot'";
      classes: FGAmmoTypeSpreadshot[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGRecipe'";
      classes: FGRecipe[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGCustomizationRecipe'";
      classes: FGCustomizationRecipe[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildable'";
      classes: FGBuildable[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactory'";
      classes: FGBuildableFactory[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactoryBuilding'";
      classes: FGBuildableFactoryBuilding[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactorySimpleProducer'";
      classes: FGBuildableFactorySimpleProducer[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturer'";
      classes: FGBuildableManufacturer[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturerVariablePower'";
      classes: FGBuildableManufacturerVariablePower[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorFuel'";
      classes: FGBuildableGeneratorFuel[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorGeoThermal'";
      classes: FGBuildableGeneratorGeoThermal[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorNuclear'";
      classes: FGBuildableGeneratorNuclear[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFrackingActivator'";
      classes: FGBuildableFrackingActivator[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFrackingExtractor'";
      classes: FGBuildableFrackingExtractor[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceExtractor'";
      classes: FGBuildableResourceExtractor[];
    }
  | {
      nativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceSink'";
      classes: FGBuildableResourceSink[];
    };

export type VendorDataFor<K extends VendorData["nativeClass"]> = VendorData & {
  nativeClass: K;
};
