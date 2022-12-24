import assert from "node:assert/strict";

import * as gameImages from "~/images/game-data";

type ImagesImport = {
  [key: string]:
    | {
        src: string;
        srcset: string;
      }
    | ImagesImport
    | undefined;
};

/**
 * Get the name of the given game entity.
 */
export function useGameDataName(entity: Readonly<{ id: string }>) {
  const { t } = useI18n();
  return t(`game-data.${entity.id}.name`);
}

/**
 * Get an image from the game.
 */
export function useGameImage(path: string | null) {
  if (path !== null) {
    const segments = path.split("/");
    const imageData = segments.reduce(
      (carry, seg) => carry?.[seg] as ImagesImport | undefined,
      gameImages as ImagesImport | undefined,
    );
    if (imageData !== undefined) {
      assert("src" in imageData && "srcset" in imageData);
      return imageData as unknown as {
        src: string;
        srcset: string;
      };
    }
  }

  return gameImages.fallback;
}
