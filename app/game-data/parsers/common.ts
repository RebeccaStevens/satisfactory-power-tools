import { Array, Effect, Predicate, pipe } from "effect";

import type { ItemAmount } from "~/game-data/parsers/types";
import { Color, type Int, ItemForm } from "~/types";

import { ParseError } from "./errors";
import {
  parseInt,
  parseListNullable,
  parseMap,
  parseMapNullable,
} from "./primitives";

export function parseItemAmounts(
  data: string,
): Effect.Effect<ItemAmount[] | null, ParseError> {
  return pipe(
    parseListNullable(data),
    Effect.andThen((list) =>
      list === null
        ? Effect.succeed(null)
        : pipe(list, Effect.forEach(parseItemAmount)),
    ),
  );
}

export function parseItemAmount(
  data: string,
): Effect.Effect<ItemAmount, ParseError> {
  return parseMapNullable(data).pipe(
    Effect.flatMap((values) => {
      const asMap = new Map(values);
      const itemClass = asMap.get("ItemClass");
      if (itemClass === undefined) {
        return Effect.fail(
          new ParseError(
            `"ItemClass" is missing in ItemAmount: "${JSON.stringify(values)}"`,
          ),
        );
      }

      const amountRaw = asMap.get("Amount");
      if (amountRaw === undefined) {
        return Effect.fail(
          new ParseError(
            `"Amount" is missing in ItemAmount: "${JSON.stringify(values)}"`,
          ),
        );
      }
      const amountEffect = parseInt(amountRaw);

      return amountEffect.pipe(
        Effect.andThen(
          (amount): ItemAmount => ({
            itemClass,
            amount,
          }),
        ),
      );
    }),
  );
}

export function parseTexture(
  texture: string,
): Effect.Effect<string | null, ParseError> {
  if (texture === "None") {
    return Effect.succeed(null);
  }

  const pattern = /^Texture2D (.+)$/u;
  const match = pattern.exec(texture);
  if (match === null) {
    return Effect.fail(new ParseError(`Failed to parse texture: "${texture}"`));
  }

  const [, texturePath] = match;
  if (texturePath === undefined) {
    return Effect.fail(new ParseError(`Texture path was empty: "${texture}"`));
  }

  return Effect.succeed(texturePath);
}

export function parseIcon(
  small: string,
  big: string,
): Effect.Effect<string | null, ParseError> {
  return pipe(
    parseIconCore(big),
    Effect.catchIf(Predicate.isNull, () => parseIconCore(small)),
    Effect.catchIf(Predicate.isNull, () => Effect.succeed(null)),
  );

  function parseIconCore(input: string) {
    return parseTexture(input).pipe(
      Effect.andThen((texturePath) => {
        if (texturePath === null) {
          return Effect.fail(null);
        }

        const prefix = "/Game/FactoryGame/";
        if (!texturePath.startsWith(prefix)) {
          return Effect.fail(
            new ParseError(
              `Icon's texture path didn't start with "${prefix}": "${texturePath}"`,
            ),
          );
        }

        const lastSlashIndex = texturePath.lastIndexOf("/");
        if (lastSlashIndex === -1) {
          return Effect.fail(
            new ParseError(
              `Icon's texture path contains no slashes: "${texturePath}"`,
            ),
          );
        }

        const iconDirPath = texturePath.slice(
          prefix.length,
          lastSlashIndex + 1,
        );

        const iconFileNameFull = texturePath.slice(lastSlashIndex + 1);
        const iconFileName = iconFileNameFull.slice(
          0,
          iconFileNameFull.lastIndexOf("."),
        );

        const iconPathWIthSize = `${iconDirPath.toLowerCase()}${iconFileName}`;
        const iconPath = iconPathWIthSize.replace(/_\d+$/u, "");

        return Effect.succeed(`images/vendor/${iconPath}.png`);
      }),
    );
  }
}

export function parseColor(value: string): Effect.Effect<Color, ParseError> {
  return pipe(
    parseMap(value),
    Effect.flatMap((channels) =>
      pipe(
        channels,
        Array.map(([key, channelValueRaw]) =>
          pipe(Effect.all([rawKeyToColorKey(key), parseInt(channelValueRaw)])),
        ),
        Effect.allSuccesses,
        Effect.map((entries) =>
          Color(
            Object.fromEntries(entries) as {
              red: Int;
              green: Int;
              blue: Int;
              alpha: Int;
            },
          ),
        ),
      ),
    ),
  );

  function rawKeyToColorKey(
    key: string,
  ): Effect.Effect<"red" | "green" | "blue" | "alpha", ParseError> {
    switch (key) {
      case "R": {
        return Effect.succeed("red");
      }
      case "G": {
        return Effect.succeed("green");
      }
      case "B": {
        return Effect.succeed("blue");
      }
      case "A": {
        return Effect.succeed("alpha");
      }
      default: {
        return Effect.fail(
          new ParseError(`unknown color key: "${key}" in "${value}"`),
        );
      }
    }
  }
}

export function parseItemForm(
  value: string,
): Effect.Effect<ItemForm, ParseError> {
  switch (value) {
    case "RF_SOLID": {
      return Effect.succeed(ItemForm.Solid);
    }
    case "RF_LIQUID": {
      return Effect.succeed(ItemForm.Liquid);
    }
    case "RF_GAS": {
      return Effect.succeed(ItemForm.Gas);
    }
    case "RF_INVALID": {
      return Effect.succeed(ItemForm.Invalid);
    }
    default: {
      return Effect.fail(new ParseError(`Unknown item form: "${value}"`));
    }
  }
}
