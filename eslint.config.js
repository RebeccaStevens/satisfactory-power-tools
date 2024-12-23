// @ts-check
import path from "node:path";

import rsEslint from "@rebeccastevens/eslint-config";
import browserslist from "browserslist";
import { assert } from "chai";
// @ts-ignore
import reactCompiler from "eslint-plugin-react-compiler";

const browserslistConfig = browserslist.readConfig(path.join(import.meta.dirname, ".browserslistrc"));

const browserslistConfigProduction =
  browserslistConfig["production"] ?? assert.fail("Failed to load browserslist production config");

export default rsEslint(
  {
    projectRoot: import.meta.dirname,
    mode: "application",
    typescript: {
      unsafe: "off",
    },
    formatters: true,
    functional: "recommended",
    jsonc: true,
    markdown: true,
    stylistic: true,
    tailwind: false, // https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/325
    yaml: true,
    ignores: [
      "app/game-data/index.ts",
      "app/game-data/vendor/**",
      "app/game-data/generate/peggy/collection.js",
      "app/game-data/generate/peggy/collection.d.ts",
    ],
  },
  {
    files: ["app/**"],
    plugins: {
      "react-compiler": reactCompiler,
    },
    rules: {
      "no-console": [
        "error",
        {
          allow: ["debug", "info", "warn", "error"],
        },
      ],
      "no-empty-pattern": "warn",

      "functional/no-expression-statements": "off",

      "jsdoc/require-jsdoc": "off",

      "node/no-sync": [
        "error",
        {
          ignores: ["existsSync", "runSync"],
        },
      ],

      "promise/avoid-new": "off",

      "react-compiler/react-compiler": "error",

      "unicorn/no-array-for-each": "off",
      "unicorn/no-unnecessary-polyfills": [
        "error",
        {
          targets: browserslistConfigProduction,
        },
      ],
    },
  },
  {
    files: ["app/components/**/*.tsx"],
    rules: {
      "unicorn/filename-case": ["off"],
    },
  },
  {
    files: ["app/game-data/generate/parsers/**/assert.ts"],
    rules: {
      "ts/naming-convention": "off",
    },
  },
  {
    // scripts
    files: ["app/game-data/generate/index.ts"],
    rules: {
      "functional/no-expression-statements": "off",
    },
  },
  {
    files: ["!app/**"],
    rules: {
      "no-console": "off",
    },
  },
);
