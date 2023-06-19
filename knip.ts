import { type KnipConfig } from "knip/dist/index";

const compiler = /<script\b[^>]*>([\S\s]*?)<\/script>/gmu;

const config: KnipConfig = {
  entry: [
    "src/main.ts!",
    "images/**/index.ts!",
    "src/components.d.ts",
    "srcipts/*/index.ts",
    "tests/**/*.test.ts",
  ],
  project: [
    "src/**/*.ts!",
    "images/**/index.ts!",
    "srcipts/**/*.ts",
    "tests/**/*.ts",
  ],
  rules: {
    files: "warn",
    dependencies: "warn",
    devDependencies: "warn",
    unlisted: "error",
    binaries: "error",
    unresolved: "error",
    exports: "off",
    types: "off",
    nsExports: "off",
    nsTypes: "off",
    duplicates: "error",
    enumMembers: "error",
    classMembers: "error",
  },
  ignore: ["**/*.d.ts", "src/modules/*.ts", "src/data/**/*.ts"],
  ignoreDependencies: [
    "knip",
    "@esbuild-plugins/node-globals-polyfill",
    "@iconify-json/bx",
    "@iconify/json",
    "@iconify/utils",
    "@unocss/core",
    "@unocss/preset-attributify",
    "@unocss/preset-icons",
    "@unocss/preset-typography",
    "@unocss/preset-uno",
    "@unocss/preset-web-fonts",
    "@unocss/reset",
    "@unocss/transformer-compile-class",
    "@unocss/transformer-directives",
    "@unocss/transformer-variant-group",
    "@vitest/coverage-c8",
    "commitizen",
    "esbuild",
    "eslint-config-prettier",
    "eslint-plugin-ava",
    "eslint-plugin-node",
    "eslint-plugin-prettier",
    "vue-i18n",
    "virtual:generated-layouts",
    "virtual:generated-pages",
    "virtual:uno.css",
  ],
  compilers: {
    vue: (text) => {
      const scripts: string[] = [];
      while (true) {
        const match = compiler.exec(text);
        if (match === null) {
          break;
        }
        if (match[1] !== undefined) {
          scripts.push(match[1]);
        }
      }
      return scripts.join(";");
    },
  },
};

export default config;
