import { createI18n } from "vue-i18n";

import { type UserModule } from "~/types";

const messages = Object.fromEntries(
  Object.entries(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    import.meta.glob<{ default: any }>("../../locales/*.yml", {
      eager: true,
    }),
  ).map(([key, value]) => {
    return [key.slice(14, -4), value.default];
  }),
);

export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: "en",
    messages,
  });

  app.use(i18n);
};
