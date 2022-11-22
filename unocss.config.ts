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
import { presetCore, presetThemeDefault } from "anu-vue";

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
      extraProperties: {
        height: "1.5em",
        "flex-shrink": "0",
        display: "inline-block",
      },
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
    presetCore(),
    presetThemeDefault(),
  ],
  transformers: [
    transformerCompileClass(),
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  include: ["./**/*.vue", "./**/*.html", /.*\/anu-vue\.js(.*)?$/u],
  exclude: [],
};

export default config;
