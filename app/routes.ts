import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("dump", "routes/dump.tsx")] satisfies RouteConfig;
