// @ts-check
import rsEslint from "@rebeccastevens/eslint-config";

export default rsEslint(
  {
    projectRoot: import.meta.dirname,
    mode: "application",
    typescript: {
      unsafe: "off",
    },
    formatters: true,
    functional: "lite",
    jsonc: true,
    markdown: true,
    react: {
      overrides: {
        // TODO: Move to @rebeccastevens/eslint-config
        "react-refresh/only-export-components": [
          "error",
          {
            allowConstantExport: true,
            allowExportNames: [
              "action",
              "clientAction",
              "clientloader",
              "ErrorBoundary",
              "handle",
              "headers",
              "HydrateFallback",
              "links",
              "loader",
              "meta",
              "shouldRevalidate",
            ],
          },
        ],
      },
    },
    stylistic: true,
    tailwind: false, // https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/325
    yaml: true,
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "import/no-extraneous-dependencies": "off",
      "no-empty-pattern": "warn",
    },
  },
);
