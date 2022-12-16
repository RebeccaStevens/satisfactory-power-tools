import assert from "node:assert/strict";

export function assertNever(msg = "never reached"): never {
  return void assert(false, msg) as never;
}
