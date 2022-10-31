import path from "node:path";
import url from "node:url";

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import VueI18n from "@intlify/vite-plugin-vue-i18n";
import Unocss from "@unocss/vite";
import Vue from "@vitejs/plugin-vue";
import { AnuComponentResolver } from "anu-vue";
import rollupUnassert from "rollup-plugin-unassert";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";
// eslint-disable-next-line import/no-deprecated, import/no-named-as-default-member -- Something is going wrong with eslint here.
import Pages from "vite-plugin-pages";
import { VitePWA } from "vite-plugin-pwa";
import Layouts from "vite-plugin-vue-layouts";
import generateSitemap from "vite-ssg-sitemap";
import TsConfigPaths from "vite-tsconfig-paths";

const dirname = path.dirname(url.fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(`Command: ${command}\nMode:    ${mode}`);
  process.env.NODE_ENV = mode;

  return {
    resolve: {
      alias: {
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
            importPatterns: [
              'import assert from "assert"',
              'import * as assert from "assert"',
              'import * as assert from "~/assert"',
            ],
            requirePatterns: [
              'assert = require("assert")',
              'assert = require("~/assert")',
            ],
          }),
        ],
      },
    },

    worker: {
      format: "es",
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
        exclude: ["**/components/**/*"],
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
