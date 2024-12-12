// @ts-check
import path from "node:path";

import rsEslint from "@rebeccastevens/eslint-config";
import browserslist from "browserslist";
import { assert } from "chai";

const browserslistConfig = browserslist.readConfig(path.join(import.meta.dirname, ".browserslistrc"));

const browserslistConfigProduction =
  browserslistConfig["production"] ?? assert.fail("Failed to load browserslist production config");

export default rsEslint(
  {
    projectRoot: import.meta.dirname,
    mode: "application",
    formatters: true,
    functional: "recommended",
    jsonc: true,
    markdown: true,
    react: true,
    stylistic: true,
    tailwind: false, // waiting for v4 support
    typescript: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["?(.)*.?(c)js"],
        },
      },
      unsafe: "off",
    },
    yaml: true,
  },
  {
    files: ["app/**"],
    rules: {
      "no-console": [
        "error",
        {
          allow: ["debug", "info", "warn", "error"],
        },
      ],

      "functional/no-expression-statements": "off",

      "import/no-unassigned-import": [
        "error",
        {
          allow: ["**/*.?(s)css", "server-only", "tsx", "tsx/*"],
        },
      ],

      "jsdoc/require-jsdoc": "off",

      "unicorn/no-unnecessary-polyfills": [
        "error",
        {
          targets: browserslistConfigProduction,
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
    },
  },
  {
    files: ["!app/**"],
    rules: {
      "no-console": "off",
    },
  },
  {
    files: ["*.?([cm])[jt]s?(x)"],
    rules: {
      "functional/no-expression-statements": "off",
      "functional/no-conditional-statements": "off",
    },
  },
);
