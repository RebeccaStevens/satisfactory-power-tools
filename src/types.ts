import { type ViteSSGContext } from "vite-ssg";

export type UserModule = (
  // eslint-disable-next-line functional/prefer-immutable-types
  context: ViteSSGContext,
) => void;
