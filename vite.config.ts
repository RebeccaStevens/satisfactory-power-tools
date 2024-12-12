/// <reference types="vitest/config" />
import { vitePlugin as remix } from "@remix-run/dev";
import strip from "@rollup/plugin-strip";
import { assert } from "chai";
import dedent from "dedent";
import deassert from "rollup-plugin-deassert";
import { type UserConfig, defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  /* eslint-disable ts/consistent-type-definitions, ts/naming-convention */
  interface Future {
    v3_singleFetch: true;
  }
  /* eslint-enable ts/consistent-type-definitions, ts/naming-convention */
}

export default defineConfig(({ command, mode }) => {
  console.log(dedent`
    Command: ${command}
    Mode:    ${mode}
  `);

  assert.oneOf(mode, ["development", "test", "production"], "Invalid mode");
  process.env.NODE_ENV = mode as typeof process.env.NODE_ENV;

  return {
    plugins: [
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          v3_singleFetch: true,
          v3_lazyRouteDiscovery: true,
        },
      }),

      tsconfigPaths(),

      ...(process.env.NODE_ENV === "production"
        ? [
            // Production only plugins:
            deassert({
              include: ["**/*.ts", "**/*.tsx"],
              deassert: {
                modules: ["chai"],
              },
            }),
            strip({
              debugger: true,
              functions: ["console.debug", "console.log"],
            }),
          ]
        : []),
    ],

    test: {
      include: ["**/*.test.ts"],
      includeSource: ["app/**/*.{ts,tsx}"],
      exclude: ["build", "node_modules"],
      coverage: {
        all: true,
        reporter: ["lcov", "text"],
        watermarks: {
          lines: [80, 95],
          functions: [80, 95],
          branches: [80, 95],
          statements: [80, 95],
        },
      },
    },

    // define: {
    //   "import.meta.vitest": "undefined",
    // },
  } satisfies UserConfig;
});
