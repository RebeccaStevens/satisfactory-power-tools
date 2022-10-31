import { setupLayouts } from "virtual:generated-layouts";
import { ViteSSG } from "vite-ssg";

import App from "./App.vue";
import type { UserModule } from "./types";

import generatedRoutes from "~pages";

import "uno.css";
import "anu-vue/dist/style.css";

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
