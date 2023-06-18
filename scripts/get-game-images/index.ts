import * as fsp from "node:fs/promises";
import * as path from "node:path";
import * as url from "node:url";

import "~/polyfills";
import { getIconPath } from "~/scripts/parse-raw-game-data/docs";
import { loadData } from "~/scripts/parse-raw-game-data/docs/load";
import { isNotNull } from "~/utils";

// Windows powershell command to export game data.
//
// `.\umodel.exe -path="path\to\game" -out=".\exported-game-data" -export * -nomesh -noanim -nostat -novert -nomorph -nolightmap`

const rootDir = path.join(
  path.dirname(url.fileURLToPath(import.meta.url)),
  "../../",
);

const exportedGameDataPath = path.join(rootDir, "exported-game-data/");
const outDir = path.join(rootDir, "images/game-data/");
const imageExt = "png";
const dotImageExt = `.${imageExt}`;

const data = loadData();

const imagePaths = data.items
  .map((item) => {
    if (item.mPersistentBigIcon === null) {
      return null;
    }

    const src = path.join(
      exportedGameDataPath,
      `${item.mPersistentBigIcon}${dotImageExt}`,
    );
    const out = path.join(
      outDir,
      "items",
      `${getIconPath(path.basename(src, dotImageExt))}${dotImageExt}`,
    );
    return {
      src,
      out,
    };
  })
  .filter(isNotNull);

for (const { src, out } of imagePaths) {
  await fsp.mkdir(path.dirname(out), { recursive: true });
  await fsp.copyFile(src, out);
}
