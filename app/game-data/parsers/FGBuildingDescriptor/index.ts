import { Effect, pipe } from "effect";

import {
  type AbstractBase,
  parseAbstractBase,
} from "~/game-data/parsers/abstractBase";
import {
  parseColor,
  parseIcon,
  parseItemForm,
} from "~/game-data/parsers/common";
import type { ParseError } from "~/game-data/parsers/errors";
import {
  parseBoolean,
  parseFloat,
  parseString,
} from "~/game-data/parsers/primitives";
import {
  AssertPath,
  type Color,
  Gray,
  type ItemForm,
  MegaJoule,
  MenuPriority,
} from "~/types";

import { assertVendorFGBuildingDescriptor } from "./assert";

export function parseFGBuildingDescriptor(
  data: unknown,
): Effect.Effect<FGBuildingDescriptor, ParseError> {
  assertVendorFGBuildingDescriptor(data);

  return pipe(
    Effect.all([
      parseAbstractBase(data),
      pipe(
        Effect.all({
          description: parseString(data.mDescription),
          abbreviatedDisplayName: parseString(data.mAbbreviatedDisplayName),
          form: parseItemForm(data.mForm),
          gasColor: parseColor(data.mGasColor),
          fluidColor: parseColor(data.mFluidColor),
          energyValue: parseFloat(data.mEnergyValue).pipe(
            Effect.map(MegaJoule),
          ),
          radioactiveDecay: parseFloat(data.mRadioactiveDecay).pipe(
            Effect.map(Gray),
          ),
          icon: parseIcon(data.mSmallIcon, data.mPersistentBigIcon).pipe(
            Effect.map((icon) => (icon === null ? null : AssertPath(icon))),
          ),
          isAlienItem: parseBoolean(data.mIsAlienItem),
          menuPriority: parseFloat(data.mMenuPriority).pipe(
            Effect.map(MenuPriority),
          ),
        }),
      ),
    ]),

    Effect.andThen(([item, extraProps]) => ({
      ...item,
      ...extraProps,
    })),
  );
}

export type FGBuildingDescriptor = AbstractBase & {
  description: string;
  abbreviatedDisplayName: string;
  gasColor: Color;
  fluidColor: Color;
  form: ItemForm;
  energyValue: MegaJoule;
  radioactiveDecay: Gray;
  icon: AssertPath | null;
  isAlienItem: boolean;
  menuPriority: MenuPriority;
};
