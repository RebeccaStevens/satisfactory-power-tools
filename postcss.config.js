import cssnanoPresetAdvanced from "cssnano-preset-advanced";

const cssnanoPreset = cssnanoPresetAdvanced({
  reduceIdents: false,
  mergeRules: false,
  normalizeWhitespace: false,
  discardComments: process.env.NODE_ENV === "production" ? { removeAll: true } : false,
});

export default {
  plugins: {
    "postcss-preset-env": {
      env: "production",
      enableClientSidePolyfills: true,
      features: {
        "blank-pseudo-class": false,
      },
    },
    "postcss-import": {},
    "postcss-url": {},
    tailwindcss: {},
    ...(process.env.NODE_ENV === "production"
      ? {
          cssnano: {
            preset: cssnanoPreset,
          },
        }
      : {}),
  },
};
