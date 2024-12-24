// eslint-disable-next-line no-restricted-globals
const isClient = typeof window !== "undefined";

const validThemes = ["dark", "light", "system"] as const;
const defaultTheme = "dark" satisfies (typeof validThemes)[number];

export function getUserThemeClass() {
  const cookie = isClient
    ? decodeURIComponent(
        /preferred-color-scheme=[^;]+/u
          .exec(document.cookie)
          ?.toString()
          .replace(/^[^=]+./u, "") ?? "",
      )
    : "system"; // TODO: server-side cookie loading
  const value = validThemes.includes(cookie) ? (cookie as (typeof validThemes)[number]) : "system";
  return isClient ? (value === "system" ? getColorScheme() : value) : defaultTheme;
}

export function initThemeWatcher() {
  if (!isClient) {
    return;
  }

  updateTheme();
  globalThis.matchMedia("(prefers-color-scheme: light)").addEventListener("change", updateTheme);
}

function updateTheme() {
  const theme = getUserThemeClass();
  document.documentElement.classList.toggle("light", theme === "light");
}

function getColorScheme() {
  if (globalThis.matchMedia("(prefers-color-scheme)").media !== "not all") {
    if (globalThis.matchMedia("(prefers-color-scheme:dark").matches) {
      return "dark";
    }
    if (globalThis.matchMedia("(prefers-color-scheme:light").matches) {
      return "light";
    }
  }

  return defaultTheme;
}
