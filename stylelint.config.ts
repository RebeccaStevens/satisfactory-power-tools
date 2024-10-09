import path from "node:path";

import browserslist from "browserslist";
import { assert } from "chai";
import type { Config } from "stylelint";

const browserslistConfig = browserslist.readConfig(path.join(import.meta.dirname, ".browserslistrc"));

const browserslistConfigProduction =
  browserslistConfig["production"] ?? assert.fail("Failed to load browserslist production config");

const noUnsupportedBrowserFeaturesIgnore = ["css-display-contents", "css-nesting"];

export default {
  extends: ["stylelint-config-recommended", "stylelint-config-idiomatic-order"],
  plugins: ["stylelint-high-performance-animation", "stylelint-no-unsupported-browser-features"],
  ignoreFiles: [".husky/**", "build/**", "coverage/**", "node_modules/**"],
  rules: {
    "block-no-empty": null,
    "property-no-unknown": [
      true,
      {
        ignoreProperties: ["text-fill-color"],
      },
    ],
    "max-nesting-depth": 3,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["apply", "screen", "tailwind"],
      },
    ],
    "plugin/no-low-performance-animation-properties": [
      true,
      {
        ignore: "paint-properties",
      },
    ],
    "plugin/no-unsupported-browser-features": [
      true,
      {
        browsers: browserslistConfigProduction,
        severity: "warning",
        ignore: noUnsupportedBrowserFeaturesIgnore,
      },
    ],
  },
} satisfies Config;
