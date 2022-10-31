import { type UserModule } from "~/types";

export const install: UserModule = ({ isClient, router }) => {
  if (!isClient) return;

  void router.isReady().then(async () => {
    const { registerSW } = await import("virtual:pwa-register");
    registerSW({ immediate: true });
  });
};
