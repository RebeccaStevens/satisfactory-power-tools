import fsp from "node:fs/promises";
import path from "node:path";

import dedent from "dedent";
import * as devalue from "devalue";
import { Array, Effect, pipe } from "effect";

import { IOError, JsonError } from "~/errors";
import { upgradeVendorData } from "~/game-data/generate/upgrade";
import { stripBom } from "~/utils";

import { ParseError } from "./parsers/errors";
import { parseVendorData } from "./parsers/vendor-data";

const program = pipe(
  generateGameData(),
  Effect.andThen(upgradeVendorData),
  Effect.andThen((data) =>
    fsp.writeFile(
      path.join(import.meta.dirname, "../index.ts"),
      dedent`
        import type { GameData } from "~/game-data/types";

        // @ts-ignore
        const gameData: GameData = ${devalue.uneval(data)};
        export default gameData;
      `,
    ),
  ),
);

await Effect.runPromise(program);

/**
 * Generate all the game data for the given locale.
 */
function generateGameData() {
  return pipe(readVenderData(), Effect.flatMap(parseVendorData));
}

/**
 * Read the vendor data file for the given locale and parse the JSON.
 */
function readVenderData() {
  const filepath = path.join(import.meta.dirname, "vendor/community-resources/en-US.json");

  return pipe(
    Effect.tryPromise({
      try: () => fsp.readFile(filepath),
      catch: () => new IOError(`Failed to read vendor data file.`),
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
