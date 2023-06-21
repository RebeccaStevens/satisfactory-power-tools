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

const extraImages = [
  [
    "other",
    "Game/FactoryGame/Resource/Parts/ResourceSinkCoupon/UI/IconDesc_Ficsit_Coupon_256",
  ],
];

const imagePaths = [
  ...data.items.map((item) => ["items", item.mPersistentBigIcon] as const),
  ...data.buildings.map(
    (building) => ["buildings", building.mPersistentBigIcon] as const,
  ),
  ...extraImages,
]
  .filter(([dir, icon]) => isNotNull(icon))
  .map(([dir, icon]) => {
    const src = path.join(exportedGameDataPath, `${icon}${dotImageExt}`);
    const out = path.join(
      outDir,
      dir,
      `${getIconPath(path.basename(src, dotImageExt))}${dotImageExt}`,
    );
    return {
      src,
      out,
    };
  });

for (const { src, out } of imagePaths) {
  await fsp.mkdir(path.dirname(out), { recursive: true });
  await fsp.copyFile(src, out);
}
