import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";

import dedent from "dedent";
import * as devalue from "devalue";
import { Array, Effect, Option, pipe } from "effect";
import sharp from "sharp";

import { FGImgFormats, FGImgSize } from "~/components/FGImg";
import { IOError, JsonError } from "~/errors";
import type { VendorData } from "~/game-data/generate/parsers/types";
import { upgradeVendorData } from "~/game-data/generate/upgrade";
import { runAsyncActions, stripBom } from "~/utils";

import { ParseError } from "./parsers/errors";
import { parseVendorData } from "./parsers/vendor-data";

const imageFileExtensions = [".png"];

const gameData = await pipe(
  generateFGImages(),
  Effect.andThen(generateGameData),
  Effect.andThen(upgradeVendorData),
  Effect.runPromise,
);

await fsp.writeFile(
  path.join(import.meta.dirname, "../index.ts"),
  dedent`
    import { Option } from "effect";

    import type { GameData } from "~/game-data/types";

    // @ts-ignore
    const gameData: GameData = ${devalue.uneval(gameData, function replacer(value) {
      if (Option.isSome(value)) {
        const stringifiedValue = devalue.uneval(value.value, replacer);
        return `Option.some(${stringifiedValue})`;
      }
      if (Option.isNone(value)) {
        return `Option.none()`;
      }
      return undefined;
    })};
    export default gameData;
  `,
);

function generateFGImages(): Effect.Effect<Promise<unknown[]>, IOError> {
  return pipe(
    findAllImageFiles(),
    Effect.map((imageFilePaths) => {
      let mut_count = 0;
      const actions = imageFilePaths.flatMap((imageFilePath) => {
        const basepath = path.resolve(import.meta.dirname, "../vendor/images");
        const relativePath = path.relative(basepath, imageFilePath);
        const relativePathWithoutExtension = relativePath.slice(0, -path.extname(relativePath).length);
        const outPathWithoutExtension = path.resolve(
          import.meta.dirname,
          "../../../public/images/vendor",
          relativePathWithoutExtension,
        );
        const relativeOutPath = path.relative(
          path.join(import.meta.dirname, "../../../public/images/vendor"),
          outPathWithoutExtension,
        );

        const outDirPath = path.dirname(outPathWithoutExtension);

        return FGImgFormats.flatMap((format) =>
          FGImgSize.flatMap((size) => {
            const outPath = `${outPathWithoutExtension}_${size}.${format}`;
            if (fs.existsSync(outPath)) {
              return [];
            }

            return () => {
              console.info(`Generating image [${format}] (${++mut_count}/${actions.length}): ${relativeOutPath}`);

              return fsp.mkdir(outDirPath, { recursive: true }).then(() => {
                const sharpInstance = sharp(imageFilePath);
                return (
                  sharpInstance
                    .metadata()
                    // eslint-disable-next-line promise/no-nesting
                    .then((metadata) => (metadata.width ?? 0) >= size)
                    .then((shouldGenerate) =>
                      shouldGenerate
                        ? sharpInstance
                            .resize({ width: size, fastShrinkOnLoad: true, withoutEnlargement: true })
                            .toFormat(format)
                            .toFile(outPath)
                        : undefined,
                    )
                );
              });
            };
          }),
        );
      });
      return runAsyncActions(actions, 8);
    }),
  );
}

function findAllImageFiles(): Effect.Effect<string[], IOError> {
  return pipe(
    Effect.tryPromise({
      try: () => fsp.readdir(path.join(import.meta.dirname, "../vendor/images"), { recursive: true }),
      catch: () => new IOError(`Failed to read image directory.`),
    }),
    Effect.andThen((files) =>
      pipe(
        files,
        Array.filter((file) => imageFileExtensions.some((ext) => file.endsWith(ext))),
        Array.map((file) => path.join(import.meta.dirname, "../vendor/images", file)),
      ),
    ),
  );
}

/**
 * Generate all the game data.
 */
function generateGameData(): Effect.Effect<VendorData[], IOError | JsonError | ParseError> {
  return pipe(readVenderData(), Effect.flatMap(parseVendorData));
}

/**
 * Read the vendor data file and parse the JSON.
 */
function readVenderData(): Effect.Effect<unknown[], IOError | JsonError | ParseError> {
  const filepath = path.join(import.meta.dirname, "../vendor/community-resources/en-US.json");

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
