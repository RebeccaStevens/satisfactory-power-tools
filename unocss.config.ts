import path from "node:path";
import url from "node:url";

import { FileSystemIconLoader } from "@iconify/utils/lib/loader/node-loaders";
import { type UserConfig } from "@unocss/core";
import presetAttributify from "@unocss/preset-attributify";
import presetIcons from "@unocss/preset-icons";
import presetTypography from "@unocss/preset-typography";
import presetUno, { type Theme as PresetUnoTheme } from "@unocss/preset-uno";
import presetWebFonts from "@unocss/preset-web-fonts";
import transformerCompileClass from "@unocss/transformer-compile-class";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";

const dirname = path.dirname(url.fileURLToPath(import.meta.url));

const iconDirectory = path.resolve(dirname, "icons");

const config: UserConfig<PresetUnoTheme> = {
  shortcuts: [],
  rules: [
    [
      "display-none",
      {
        display: "none !important",
      },
    ],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      warn: true,
      scale: 1.2,
      extraProperties: {},
      collections: {
        custom: FileSystemIconLoader(iconDirectory),
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: "Open Sans",
        serif: "Roboto Slab",
        mono: "Fira Code",
      },
    }),
  ],
  transformers: [
    transformerCompileClass(),
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  include: ["./**/*.vue", "./**/*.html"],
  exclude: [],
  safelist: [
    // Icons for framework.
    "i-carbon-checkmark-outline",
    "i-carbon-subtract-alt",
    "i-carbon-information",
    "i-carbon-warning",
    "i-carbon-arrow-up",
    "i-carbon-arrow-right",
    "i-carbon-arrow-down",
    "i-carbon-arrow-left",
    "i-ic-baseline-arrow-drop-down",
    "i-carbon-chevron-left",
    "i-carbon-chevron-right",
    "i-carbon-gradient",
    "i-carbon-settings-adjust",
    "i-carbon-color-palette",
    "i-carbon-restart",
    "i-carbon-chevron-up",
    "i-carbon-chevron-down",
    "i-carbon-circle-solid",
    "i-carbon-close-outline",
    "i-carbon-checkmark",
    "i-carbon-time",
    "i-carbon-calendar",
    "i-carbon-text-bold",
    "i-carbon-text-italic",
    "i-carbon-text-strikethrough",
    "i-carbon-text-underline",
    "i-carbon-list-bulleted",
    "i-carbon-list-numbered",
    "i-carbon-text-subscript",
    "i-carbon-text-superscript",
    "i-carbon-text-link",
    "i-carbon-fit-to-screen",
    "i-carbon-quotes",
    "i-carbon-text-align-left",
    "i-carbon-text-align-center",
    "i-carbon-text-align-right",
    "i-carbon-text-align-justify",
    "i-carbon-printer",
    "i-carbon-text-indent-less",
    "i-carbon-text-indent-more",
    "i-carbon-text-clear-format",
    "i-carbon-text-color",
    "i-carbon-text-font",
    "i-carbon-subtract",
    "i-carbon-undo",
    "i-carbon-redo",
    "i-ci-heading-h1",
    "i-ci-heading-h2",
    "i-ci-heading-h3",
    "i-ci-heading-h4",
    "i-ci-heading-h5",
    "i-ci-heading-h6",
    "i-carbon-code",
    "i-carbon-number-1",
    "i-carbon-number-2",
    "i-carbon-number-3",
    "i-carbon-number-4",
    "i-carbon-number-5",
    "i-carbon-number-6",
    "i-carbon-number-7",
    "i-carbon-caret-down",
    "i-carbon-add",
    "i-carbon-close",
    "i-carbon-close-filled",
    "i-carbon-error-filled",
    "i-carbon-page-first",
    "i-carbon-star-filled",
    "i-carbon-edit",
    "i-carbon-error",
    "i-carbon-warning-alt-filled",
    "i-carbon-play-filled-alt",
    "i-carbon-add-filled",
    "i-carbon-cloud-upload",
    "i-carbon-sort-remove",
    "i-carbon-task-remove",
  ],
};

export default config;
