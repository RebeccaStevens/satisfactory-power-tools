import { assert } from "chai";

import * as gameImages from "~/images/game-data";

type ImagesImport = {
  [key: string]: ImageSrc | ImagesImport | undefined;
};

export type ImageSrc = {
  src: string;
  srcset: string;
};

/**
 * Get an image from the game.
 */
export function useGameImage(path: string | null | undefined) {
  if (path !== null && path !== undefined) {
    const segments = path.split("/");
    const imageData = segments.reduce(
      (carry, seg) => carry?.[seg] as ImagesImport | undefined,
      gameImages as ImagesImport | undefined,
    );
    if (imageData !== undefined) {
      assert("src" in imageData && "srcset" in imageData);
      return imageData as unknown as ImageSrc;
    }
  }

  return gameImages.fallback;
}
