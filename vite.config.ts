/// <reference types="vitest" />
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],

  define: {
    "import.meta.vitest": "undefined",
  },

  test: {
    include: ["./**/*.test.ts"],
    includeSource: ["./app/**/*.{ts,tsx}"],
    exclude: ["dist", "node_modules"],
    coverage: {
      all: true,
      include: ["app"],
      exclude: ["build"],
      reporter: ["lcov", "text"],
      watermarks: {
        lines: [80, 95],
        functions: [80, 95],
        branches: [80, 95],
        statements: [80, 95],
      },
    },
  },
});
