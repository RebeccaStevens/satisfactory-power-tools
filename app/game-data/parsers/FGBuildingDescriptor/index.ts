import { Effect, pipe } from "effect";

import {
  type AbstractNamed,
  parseAbstractNamed,
} from "~/game-data/parsers/abstractNamed";
import {
  parseColor as parseVendorColor,
  parseIcon as parseVendorIcon,
  parseItemForm as parseVendorItemForm,
} from "~/game-data/parsers/common";
import type { ParseError } from "~/game-data/parsers/errors";
import {
  parseVendorBoolean,
  parseVendorFloat,
  parseVendorString,
} from "~/game-data/parsers/primitives";
import type { VendorColor } from "~/game-data/parsers/types";
import type { ItemForm } from "~/types";

import { assertVendorFGBuildingDescriptor } from "./assert";

export function parseFGBuildingDescriptor(
  data: unknown,
): Effect.Effect<FGBuildingDescriptor, ParseError> {
  assertVendorFGBuildingDescriptor(data);

  return pipe(
    Effect.all([
      parseAbstractNamed(data),
      pipe(
        Effect.all({
          description: parseVendorString(data.mDescription),
          abbreviatedDisplayName: parseVendorString(
            data.mAbbreviatedDisplayName,
          ),
          form: parseVendorItemForm(data.mForm),
          gasColor: parseVendorColor(data.mGasColor),
          fluidColor: parseVendorColor(data.mFluidColor),
          energyValue: parseVendorFloat(data.mEnergyValue),
          radioactiveDecay: parseVendorFloat(data.mRadioactiveDecay),
          icon: parseVendorIcon(data.mSmallIcon, data.mPersistentBigIcon),
          isAlienItem: parseVendorBoolean(data.mIsAlienItem),
          menuPriority: parseVendorFloat(data.mMenuPriority),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildingDescriptor = AbstractNamed & {
  description: string;
  abbreviatedDisplayName: string;
  gasColor: VendorColor;
  fluidColor: VendorColor;
  form: ItemForm;
  energyValue: number;
  radioactiveDecay: number;
  icon: string | null;
  isAlienItem: boolean;
  menuPriority: number;
};
