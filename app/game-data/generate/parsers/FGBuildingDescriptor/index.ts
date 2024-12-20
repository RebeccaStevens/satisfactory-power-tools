import { Effect, pipe } from "effect";

import { type FGNamed, parseFGNamed } from "~/game-data/generate/parsers/abstract/FGNamed";
import {
  parseColor as parseVendorColor,
  parseIcon as parseVendorIcon,
  parseVendorItemForm,
} from "~/game-data/generate/parsers/common";
import type { ParseError } from "~/game-data/generate/parsers/errors";
import { parseVendorBoolean, parseVendorFloat, parseVendorString } from "~/game-data/generate/parsers/primitives";
import type { VendorColor, VendorItemForm } from "~/game-data/generate/parsers/types";

import { assertVendorFGBuildingDescriptor } from "./assert";

export function parseFGBuildingDescriptor(data: unknown): Effect.Effect<FGBuildingDescriptor, ParseError> {
  assertVendorFGBuildingDescriptor(data);

  return pipe(
    Effect.all([
      parseFGNamed(data),
      pipe(
        Effect.all({
          description: parseVendorString(data.mDescription),
          abbreviatedDisplayName: parseVendorString(data.mAbbreviatedDisplayName),
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

export type FGBuildingDescriptor = FGNamed & {
  description: string;
  abbreviatedDisplayName: string;
  gasColor: VendorColor;
  fluidColor: VendorColor;
  form: VendorItemForm;
  energyValue: number;
  radioactiveDecay: number;
  icon: string | null;
  isAlienItem: boolean;
  menuPriority: number;
};
