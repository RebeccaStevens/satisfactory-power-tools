import { assert } from "chai";

export function assertNever(msg = "never reached"): never {
  assert.fail(msg);
}
