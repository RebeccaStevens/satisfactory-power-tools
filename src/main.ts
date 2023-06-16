import "~/polyfills";

import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import { ViteSSG } from "vite-ssg";

import App from "./App.vue";
import { type UserModule } from "./types";

import "quasar/src/css/index.sass";
import "virtual:uno.css";
// import "virtual:unocss-devtools";
import "~/styles/index.scss";

const routes = setupLayouts(generatedRoutes);

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    for (const module of Object.values(
      import.meta.glob<{ install: UserModule }>("./modules/*.ts", {
        eager: true,
      }),
    )) {
      module.install(ctx);
    }
  },
);
