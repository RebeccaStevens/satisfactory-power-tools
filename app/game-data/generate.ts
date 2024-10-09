import fsp from "node:fs/promises";
import path from "node:path";

import { Array, Effect, pipe } from "effect";
import * as superjson from "superjson";

import { IOError, JsonError } from "~/errors";
import { upgradeVendorData } from "~/game-data/upgrade";
import type { Locale } from "~/types/common";
import { stripBom } from "~/utils";

import { ParseError } from "./parsers/errors";
import { parseVendorData } from "./parsers/vendorData";

const program = pipe(
  generateGameData(),
  Effect.orDie,
  Effect.andThen(upgradeVendorData),
  Effect.orDie,
  Effect.andThen((data) =>
    fsp.writeFile(
      path.join(import.meta.dirname, "game-data.json"),
      superjson.stringify(data),
    ),
  ),
);
await Effect.runPromise(program);

/**
 * Generate all the game data for the given locale.
 */
function generateGameData(locale: Locale = "en-US" as Locale) {
  return pipe(readVenderData(locale), Effect.flatMap(parseVendorData));
}

/**
 * Read the vendor data file for the given locale and parse the JSON.
 */
function readVenderData(locale: Locale) {
  const filepath = path.join(
    import.meta.dirname,
    "vendor/community-resources",
    `${locale}.json`,
  );

  return pipe(
    Effect.tryPromise({
      try: () => fsp.readFile(filepath),
      catch: () =>
        new IOError(`Failed to read vendor data file for locale: "${locale}".`),
    }),

    Effect.andThen((buffer) => stripBom(buffer.toString("utf-16le"))),

    Effect.andThen((data) =>
      Effect.try({
        try: (): unknown => JSON.parse(data),
        catch: () => new JsonError(),
      }),
    ),

    Effect.andThen((data) => {
      if (!Array.isArray(data)) {
        return Effect.fail(new ParseError("vendor data must be an array"));
      }

      return Effect.succeed(data);
    }),
  );
}
