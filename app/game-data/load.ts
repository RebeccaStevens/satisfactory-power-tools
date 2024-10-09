import fsp from "node:fs/promises";
import path from "node:path";

import { Effect, pipe } from "effect";
import * as superjson from "superjson";

import { IOError, JsonError } from "~/errors";
import type { GameData } from "~/game-data/upgrade";

const program = pipe(
  loadGameData(),
  Effect.orDie,
  Effect.andThen((data) => {
    console.info(data.classes.get("Recipe_IronPlateReinforced_C"));
  }),
);
await Effect.runPromise(program);

export function loadGameData() {
  const filepath = path.join(import.meta.dirname, "game-data.json");

  return pipe(
    Effect.tryPromise({
      try: () => fsp.readFile(filepath, { encoding: "utf8" }),
      catch: () => new IOError(`Failed to read "game-data.json".`),
    }),

    Effect.andThen((data) =>
      Effect.try({
        try: (): GameData => superjson.parse<GameData>(data),
        catch: () => new JsonError(),
      }),
    ),
  );
}
