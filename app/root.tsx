/* eslint-disable comments/no-unlimited-disable */
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse } from "react-router";

import { cn } from "~/utils";

import type { Route } from "./+types/root";
import stylesheet from "./styles/index.css?url";
import { getUserThemeClass, initThemeWatcher } from "./theme";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const themeClass = getUserThemeClass();
  initThemeWatcher();

  return (
    <html lang="en" className={cn({ [themeClass]: themeClass === "light" })}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  /* eslint-disable */
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText.length > 0
          ? error.statusText
          : details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;

    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack !== undefined && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
  /* eslint-enable */
}

if (import.meta.vitest !== undefined) {
  const { it, expect } = import.meta.vitest;

  it("boop", () => {
    expect(1 + 1).toBe(2);
  });
}
