import type { Dirent } from "node:fs";
import { promises as fs } from "node:fs";
import path from "node:path";
import url from "node:url";

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import VueI18n from "@intlify/vite-plugin-vue-i18n";
import Unocss from "@unocss/vite";
import Vue from "@vitejs/plugin-vue";
import { AnuComponentResolver } from "anu-vue";
import dedent from "dedent";
import rollupUnassert from "rollup-plugin-unassert";
import type { FormatEnum } from "sharp";
import sharp from "sharp";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import Inspect from "vite-plugin-inspect";
import Pages from "vite-plugin-pages";
import { VitePWA } from "vite-plugin-pwa";
import Layouts from "vite-plugin-vue-layouts";
import generateSitemap from "vite-ssg-sitemap";
import TsConfigPaths from "vite-tsconfig-paths";

const dirname = path.dirname(url.fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(dedent`
    Command: ${command}
    Mode:    ${mode}
  `);
  process.env.NODE_ENV = mode;

  return {
    resolve: {
      alias: {
        "~/images/": `${path.resolve(dirname, "images")}/`,
        "~/": `${path.resolve(dirname, "src")}/`,
      },
    },

    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: "globalThis",
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true,
          }),
        ],
      },
    },

    build: {
      outDir: path.resolve(dirname, "dist"),
      emptyOutDir: true,
      target: "es2020",
      rollupOptions: {
        output: {
          inlineDynamicImports: false,
        },
        plugins: [
          rollupUnassert({
            include: ["**/*.ts"],
            importPatterns: ['import { strict as assert } from "node:assert";'],
          }),
        ],
      },
    },

    worker: {
      format: "es",
    },

    server: {
      port: 3000,
    },

    plugins: [
      TsConfigPaths({
        projects: [path.resolve(dirname, "tsconfig.json")],
        loose: true,
      }),

      Vue({
        reactivityTransform: true,
        script: {
          babelParserPlugins: ["importAssertions"],
        },
      }),

      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        exclude: ["**/pages/**/!(pages)/!(pages)/*"],
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          "vue",
          "vue-router",
          "vue-i18n",
          "vue/macros",
          "@vueuse/head",
          "@vueuse/core",
        ],
        dts: "src/auto-imports.d.ts",
        vueTemplate: true,
        eslintrc: {
          enabled: true,
          filepath: path.resolve(dirname, ".eslintrc-auto-import.json"),
        },
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        resolvers: [AnuComponentResolver()],
        dts: "src/components.d.ts",
        directoryAsNamespace: true,
        collapseSamePrefixes: true,
        dirs: ["src/**/components/"],
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss({
        configFile: path.resolve(dirname, "unocss.config.ts"),
        // mode: "vue-scoped",
      }),

      // https://github.com/antfu/vite-plugin-pwa
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: [],
        manifest: {
          name: "Satisfactory Power Tools",
          short_name: "SPT",
          theme_color: "#ffffff",
          icons: [
            {
              src: "/pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
      }),

      // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: false,
        include: [path.resolve(dirname, "locales/**")],
      }),

      imagetools(),

      autoImageIndex(),

      // https://github.com/antfu/vite-plugin-inspect
      // Visit http://localhost:3333/__inspect/ to see the inspector
      Inspect(),
    ],

    // https://github.com/vitest-dev/vitest
    test: {
      include: ["tests/**/*.test.ts"],
      environment: "jsdom",
      deps: {
        inline: ["@vue", "@vueuse"],
      },
      coverage: {
        provider: "c8",
        reporter: ["text", "lcov"],
      },
    },

    // https://github.com/antfu/vite-ssg
    ssgOptions: {
      script: "async",
      formatting: "minify",
      onFinished() {
        generateSitemap();
      },
    },

    ssr: {
      // TODO: workaround until they support native ESM
      noExternal: ["workbox-window", /vue-i18n/u],
    },
  };
});

/**
 * Get the list of image formats we support.
 */
function getImageFormats(): Array<keyof FormatEnum> {
  // return process.env.NODE_ENV === "production" ? ["png", "webp"] : ["webp"];
  return ["webp"];
}

/**
 * Automatically create the index files for all the images.
 */
function autoImageIndex() {
  const imageFormats = getImageFormats();

  const getIndexContent = async (
    dirContent: Readonly<Dirent[]>,
    baseDir: string,
  ) => {
    const content = await Promise.all(
      dirContent.map(async (dirent) => {
        if (dirent.isDirectory()) {
          const { name } = path.parse(dirent.name);
          return dedent`
            // import ${name} from "./${name}";
            // for (const [name, image] of ${name}) {
            //   images.set(name, image);
            // }
            export * as ${name} from "./${name}";
          `;
        }
        if (dirent.isFile()) {
          const { name, ext, dir, base } = path.parse(dirent.name);

          if (ext === ".ts") {
            return undefined;
          }

          const imageMetaData = await sharp(
            path.join(baseDir, dir, base),
          ).metadata();
          const nativeWidth = imageMetaData.width;

          const widths = [
            ...new Set([32, 64, 128, 256, nativeWidth]).values(),
          ].filter(
            (width): width is number =>
              width !== undefined &&
              width <= (nativeWidth ?? Number.POSITIVE_INFINITY),
          );

          const importsData = imageFormats.flatMap((format: string) =>
            widths.map((size) => {
              const queryString = `${new URLSearchParams({
                format,
                width: String(size),
              })
                .toString()
                .replaceAll("=&", "&")}&imagetools`;

              return {
                fullName: `${name}_${format}_${size}`,
                relPath: `./${dirent.name}?${queryString}`,
                format,
                size,
              };
            }),
          );

          const imports = importsData.map(
            ({ fullName, relPath }) =>
              dedent`
                import ${fullName} from "${relPath}";
              `,
          );

          const exports = dedent`
            export const ${name} = createSrcset([${importsData
            .map(
              ({ fullName, size, format }) =>
                `{ src: ${fullName}, size: ${size}, format: "${format}" }`,
            )
            .join(", ")}]);
          `;

          return dedent`
            ${imports.join("\n")}
            ${exports}
            // images.set("${name}", ${name})
          `;
        }
        return undefined;
      }),
    );

    const safeContent = content.filter(
      <T>(i: T | undefined): i is T => i !== undefined,
    );

    return dedent`
      import { createSrcset } from "~/utils";

      // const images = new Map<string, string>();
      // export default images;

      ${safeContent.join("\n")}
    `;
  };

  const createForDir = async (dir: string) => {
    const dirContent = await fs.readdir(dir, {
      withFileTypes: true,
    });

    const subDirs = dirContent
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    const indexContent = await getIndexContent(dirContent, dir);

    const indexPath = path.join(dir, "index.ts");
    await fs.writeFile(indexPath, indexContent, { encoding: "utf8" });
    await Promise.all(
      subDirs.map((subDir) => createForDir(path.join(dir, subDir))),
    );
  };

  return {
    name: "auto-image-index",

    async buildStart() {
      await createForDir(path.resolve(dirname, "images"));
    },
  };
}
