import { type ViteSSGContext } from "vite-ssg";

export type UserModule = (context: ViteSSGContext) => void;
