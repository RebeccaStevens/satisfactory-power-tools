import { Array, Effect, Predicate, pipe } from "effect";

import {
  type VendorColor,
  type VendorItemAmount,
  VendorItemForm,
  type VendorSizeInFoundations3D,
} from "~/game-data/generate/parsers/types";

import { ParseError } from "./errors";
import {
  parseVendorInt,
  parseVendorList,
  parseVendorMap,
  parseVendorNumber,
  parseVendorQuotedString,
} from "./primitives";

export function parseFullClassNames(quotedFullClassNames: string[]): Effect.Effect<string[], ParseError> {
  return pipe(quotedFullClassNames, Array.map(parseFullClassName), Effect.allSuccesses);
}

function parseFullClassName(quotedFullClassName: string): Effect.Effect<string, ParseError> {
  return pipe(
    parseVendorQuotedString(quotedFullClassName),
    Effect.andThen((fullClassName) => {
      const lastDotIndex = fullClassName.lastIndexOf(".");
      if (lastDotIndex === -1) {
        return Effect.fail(new ParseError(`Full Class name ("${fullClassName}") didn't match expected format.`));
      }
      if (fullClassName.includes("'")) {
        if (!fullClassName.endsWith("'")) {
          return Effect.fail(new ParseError(`Full Class name ("${fullClassName}") didn't match expected format.`));
        }

        return Effect.succeed(fullClassName.slice(lastDotIndex + 1, -1));
      }

      return Effect.succeed(fullClassName.slice(lastDotIndex + 1));
    }),
    Effect.andThen((className) => {
      if (className.length === 0) {
        return Effect.fail(new ParseError(`Failed to parse class name.`));
      }
      return Effect.succeed(className);
    }),
  );
}

export function parseItemAmounts(data: string): Effect.Effect<VendorItemAmount[], ParseError> {
  return pipe(parseVendorList(data), Effect.andThen(Effect.forEach(parseItemAmount)));
}

function parseItemAmount(data: string): Effect.Effect<VendorItemAmount, ParseError> {
  return pipe(
    parseVendorMap(data),
    Effect.flatMap((values) => {
      const asMap = new Map(values);
      const itemFullClass = asMap.get("ItemClass");
      if (itemFullClass === undefined) {
        return Effect.fail(new ParseError(`"ItemClass" is missing in ItemAmount: "${JSON.stringify(values)}"`));
      }
      const itemClassEffect = parseFullClassName(itemFullClass);

      const amountRaw = asMap.get("Amount");
      if (amountRaw === undefined) {
        return Effect.fail(new ParseError(`"Amount" is missing in ItemAmount: "${JSON.stringify(values)}"`));
      }
      const amountEffect = parseVendorInt(amountRaw);

      return pipe(
        Effect.all([itemClassEffect, amountEffect]),
        Effect.andThen(
          ([itemClass, amount]): VendorItemAmount => ({
            itemClass,
            amount,
          }),
        ),
      );
    }),
  );
}

function parseTexture(texture: string): Effect.Effect<string | null, ParseError> {
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

export function parseIcon(small: string, big: string): Effect.Effect<string | null, ParseError> {
  return pipe(
    parseIconCore(big),
    Effect.catchIf(Predicate.isNull, () => parseIconCore(small)),
    Effect.catchIf(Predicate.isNull, () => Effect.succeed(null)),
  );
}

function parseIconCore(input: string): Effect.Effect<string, ParseError | null> {
  return pipe(
    parseTexture(input),
    Effect.andThen((texturePath) => {
      if (texturePath === null) {
        return Effect.fail(null);
      }

      const prefix = "/Game/FactoryGame/";
      if (!texturePath.startsWith(prefix)) {
        return Effect.fail(new ParseError(`Icon's texture path didn't start with "${prefix}": "${texturePath}"`));
      }

      const lastSlashIndex = texturePath.lastIndexOf("/");
      if (lastSlashIndex === -1) {
        return Effect.fail(new ParseError(`Icon's texture path contains no slashes: "${texturePath}"`));
      }

      const iconDirPath = texturePath.slice(prefix.length, lastSlashIndex + 1);

      const iconFileNameFull = texturePath.slice(lastSlashIndex + 1);
      const iconFileName = iconFileNameFull.slice(0, iconFileNameFull.lastIndexOf("."));

      const iconPathWithSize = `${iconDirPath}${iconFileName}`;
      const iconPath = iconPathWithSize.replace(/(?:_new)?_\d+(?:_New)?_?$/u, "");

      return Effect.succeed(iconPath);
    }),
  );
}

export function parseColor(value: string): Effect.Effect<VendorColor, ParseError> {
  return pipe(
    parseVendorMap(value),
    Effect.flatMap((rawEntries) =>
      pipe(
        rawEntries,
        Array.map(([rawKey, rawValue]) => pipe(Effect.all([rawKeyToKey(rawKey), parseVendorInt(rawValue)]))),
        Effect.allSuccesses,
        Effect.map(
          (entries) =>
            Object.fromEntries(entries) as {
              red: number;
              green: number;
              blue: number;
              alpha: number;
            },
        ),
      ),
    ),
  );

  function rawKeyToKey(key: string): Effect.Effect<"red" | "green" | "blue" | "alpha", ParseError> {
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
        return Effect.fail(new ParseError(`unknown color key: "${key}" in "${value}"`));
      }
    }
  }
}

export function parseVendorSizeInFoundations3D(value: string): Effect.Effect<VendorSizeInFoundations3D, ParseError> {
  return pipe(
    parseVendorMap(value),
    Effect.flatMap((rawEntries) =>
      pipe(
        rawEntries,
        Array.map(([rawKey, rawValue]) => pipe(Effect.all([rawKeyToKey(rawKey), parseVendorNumber(rawValue)]))),
        Effect.allSuccesses,
        Effect.map(
          (entries) =>
            Object.fromEntries(entries) as {
              x: number;
              y: number;
              z: number;
            },
        ),
      ),
    ),
  );

  function rawKeyToKey(key: string): Effect.Effect<"x" | "y" | "z", ParseError> {
    switch (key) {
      case "X": {
        return Effect.succeed("x");
      }
      case "Y": {
        return Effect.succeed("y");
      }
      case "Z": {
        return Effect.succeed("z");
      }
      default: {
        return Effect.fail(new ParseError(`unknown key: "${key}" in "${value}"`));
      }
    }
  }
}

export function parseVendorItemForm(value: string): Effect.Effect<VendorItemForm, ParseError> {
  switch (value) {
    case "RF_SOLID": {
      return Effect.succeed(VendorItemForm.Solid);
    }
    case "RF_LIQUID": {
      return Effect.succeed(VendorItemForm.Liquid);
    }
    case "RF_GAS": {
      return Effect.succeed(VendorItemForm.Gas);
    }
    case "RF_INVALID": {
      return Effect.succeed(VendorItemForm.Invalid);
    }
    default: {
      return Effect.fail(new ParseError(`Unknown item form: "${value}"`));
    }
  }
}
